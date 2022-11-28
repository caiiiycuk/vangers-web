#define _XOPEN_SOURCE 700

#include <zip.h>
#include <libzip.h>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <unistd.h>
#include <dirent.h>
#include <fcntl.h>

#include <ftw.h>

#include <sys/stat.h>

#ifdef EMSCRIPTEN
EM_JS(double, getMTimeMs, (const char* path), {
  var lookup = FS.lookupPath(UTF8ToString(path));
  return lookup.node.timestamp;
});
#endif

const char *libzipTempArchive = "libzip-temp-archive.zip";

ZipArchive *readZipArchiveFile(const char *path) {
    FILE *file;
    char *buffer;
    long length;

    file = fopen(libzipTempArchive, "rb");
    if (!file) {
        fprintf(stderr, "zip_from_fs: can't open file file: '%s', errno: %d\n", path, errno);
        return 0;
    }

    fseek(file, 0, SEEK_END);
    length = ftell(file);
    rewind(file);

    buffer = (char *) malloc(length * sizeof(char) + sizeof(uint32_t));
    fread(buffer + sizeof(uint32_t), length, 1, file);
    fclose(file);
    ((uint32_t*) buffer)[0] = (uint32_t) length;
    return (ZipArchive*) buffer;
}

void safe_create_dir(const char *dir) {
    if (mkdir(dir, 0755) < 0) {
        if (errno != EEXIST) {
            perror(dir);
            exit(1);
        }
    }
}

static int is_dir(const char *dir) {
    struct stat st;
    stat(dir, &st);
    return S_ISDIR(st.st_mode);
}


int zip_recursively(zip_t *zipArchive, const char *directory, double changedAfterMs) {
    struct stat fileStat;
    struct dirent *dirp;

    DIR *dp = opendir(directory);
    if (dp == 0) {
        fprintf(stderr, "zip_from_fs: can't open directory %s\n", directory);
        return 0;
    }

    while ((dirp = readdir(dp)) != 0) {
        if (strcmp(dirp->d_name, ".") != 0 && strcmp(dirp->d_name, "..") != 0 &&
            strcmp(dirp->d_name, libzipTempArchive) != 0) {
            int nameLength = strlen(directory) + strlen(dirp->d_name) + 2;
            char *nameInFs = (char*) malloc(nameLength);
            strcpy(nameInFs, directory);
            strcat(nameInFs, "/");
            strcat(nameInFs, dirp->d_name);
            char *nameInArchive = nameInFs + 2;
            if (is_dir(nameInFs)) {
                if (zip_dir_add(zipArchive, nameInArchive, ZIP_FL_ENC_UTF_8) == -1) {
                    fprintf(stderr, "zip_from_fs: can't create directory %s, cause %s\n", nameInFs,
                            zip_strerror(zipArchive));
                    return 0;
                }
                if (!zip_recursively(zipArchive, nameInFs, changedAfterMs)) {
                    return 0;
                }
            } else {
                if (changedAfterMs > 0) {
#ifdef EMSCRIPTEN
                  double mTimeMs = getMTimeMs(nameInFs);
#else
                  if (stat(nameInFs, &fileStat) == -1) {
                    fprintf(stderr, "zip_from_fs: can't stat file %s\n", nameInFs);
                    return 0;
                  }                  
                  double mTimeMs = fileStat.st_mtim.tv_sec * 1000.0 + fileStat.st_mtim.tv_nsec / 1000000.0;
#endif
                  if (mTimeMs <= changedAfterMs) {
                    free(nameInFs);
                    continue;
                  }
                }

                zip_source_t *source = zip_source_file(zipArchive, nameInArchive, 0, 0);
                if (source == 0) {
                    fprintf(stderr, "zip_from_fs: can't create file %s, cause %s\n", nameInFs,
                            zip_strerror(zipArchive));
                    return 0;
                }
				zip_int64_t index = zip_file_add(zipArchive, nameInArchive, source, ZIP_FL_ENC_UTF_8);
                if (index == -1) {
                    zip_source_free(source);
                    fprintf(stderr, "zip_from_fs: can't create file %s, cause %s\n", nameInFs,
                            zip_strerror(zipArchive));
                    return 0;
                } else {
                    if (zip_set_file_compression(zipArchive, index, ZIP_CM_DEFLATE, 5) == -1) {
                        fprintf(stderr, "zip_from_fs: can't set compression level for %s, cause %s\n", nameInFs,
                                zip_strerror(zipArchive));
                        return 0;
                    }
                }
            }
            free(nameInFs);
        }
    }
    closedir(dp);
    return 1;
}

ZipArchive zip_fs(double changedAfterMs) {
    struct zip *zipArchive;
    char buf[100];
    int err;

    if ((zipArchive = zip_open(libzipTempArchive, ZIP_CREATE | ZIP_TRUNCATE, &err)) == NULL) {
        zip_error_to_str(buf, sizeof(buf), err, errno);
        fprintf(stderr, "zip_from_fs: can't open zip archive: %s\n", buf);
        return 0;
    }


    int success = zip_recursively(zipArchive, ".", changedAfterMs);
    if (zip_close(zipArchive) == -1) {
        fprintf(stderr, "zip_from_fs: can't close zip archive %s\n", zip_strerror(zipArchive));
        return 0;
    }

    if (!success) {
        return 0;
    }

    if (chmod(libzipTempArchive, S_IRWXU | S_IRWXG | S_IRWXO) != 0) {
        fprintf(stderr, "zip_from_fs : unable to set read mode for archive\n");
    }

    ZipArchive* archive = readZipArchiveFile(libzipTempArchive);

    if (remove(libzipTempArchive) != 0) {
        fprintf(stderr, "zip_from_fs: unable to delete archive\n");
    }

    return archive;
}

ZipArchive EMSCRIPTEN_KEEPALIVE zip_from_fs(double changedAfterMs) {
  return zip_fs(changedAfterMs);
}

int EMSCRIPTEN_KEEPALIVE zip_to_fs(const char *data, uint32_t length) {
    struct zip *zipArchive;
    struct zip_file *zipFile;
    struct zip_stat zipStat;
    char buf[100];
    int err;
    int i, len;
    int fd;
    long long sum;

    FILE *archive = fopen(libzipTempArchive, "wb");
    if (!archive) {
        fprintf(stderr, "zip_to_fs: unable to create archive file\n");
        return 1;
    }
    fwrite(data, length, 1, archive);
    fclose(archive);

    if ((zipArchive = zip_open(libzipTempArchive, 0, &err)) == 0) {
        zip_error_to_str(buf, sizeof(buf), err, errno);
        fprintf(stderr, "zip_to_fs: can't open zip archive: %s\n", buf);
        return 1;
    }

    for (i = 0; i < zip_get_num_entries(zipArchive, 0); i++) {
        if (zip_stat_index(zipArchive, i, 0, &zipStat) == 0) {
            len = strlen(zipStat.name);
            printf("extracting: '%s', ", zipStat.name);
            printf("size: %llu, ", (long long unsigned int) zipStat.size);
            printf("mtime: %u\n", (unsigned int) zipStat.mtime);
            if (zipStat.name[len - 1] == '/') {
                safe_create_dir(zipStat.name);
            } else {
                zipFile = zip_fopen_index(zipArchive, i, 0);
                if (!zipFile) {
                    fprintf(stderr, "zip_to_fs: %s\n", zip_strerror(zipArchive));
                    fprintf(stderr, "zip_to_fs: Try to repack archive with default zip program, error: '%s'\n",
                            zip_strerror(zipArchive));
                    exit(100);
                }
                fd = open(zipStat.name, O_RDWR | O_TRUNC | O_CREAT, 0644);
                if (fd < 0) {
                    fprintf(stderr, "zip_to_fs: %s\n", zip_file_strerror(zipFile));
                    exit(101);
                }
                sum = 0;
                while (sum != zipStat.size) {
                    len = zip_fread(zipFile, buf, 100);
                    if (len < 0) {
                        fprintf(stderr, "zip_to_fs: %s\n", zip_file_strerror(zipFile));
                        exit(102);
                    }
                    write(fd, buf, len);
                    sum += len;
                }
                close(fd);
                zip_fclose(zipFile);
            }
        } else {
            printf("File[%s] Line[%d]\n", __FILE__, __LINE__);
        }
    }
    if (zip_close(zipArchive) == -1) {
        fprintf(stderr, "zip_to_fs: can't close zip archive %s\n", zip_strerror(zipArchive));
        return 1;
    }

    if (remove(libzipTempArchive) != 0) {
        fprintf(stderr, "zip_to_fs: unable to delete archive\n");
        return 1;
    }

    return 0;
}

void EMSCRIPTEN_KEEPALIVE libzip_destroy() {
#ifdef EMSCRIPTEN
    emscripten_force_exit(0);
#endif
}


int unlink_cb(const char *fpath, const struct stat *sb, int typeflag, struct FTW *ftwbuf) {
	int rv = remove(fpath);

	if (rv)
		perror(fpath);

	return rv;
}

int rmrf(char *path) {
	return nftw(path, unlink_cb, 64, FTW_DEPTH | FTW_PHYS);
}

void EMSCRIPTEN_KEEPALIVE clear_cwd() {
	const int max = 2048;
	char dir[max];
	getcwd(dir, max);
	rmrf(dir);
	mkdir(dir, 0700);
}
