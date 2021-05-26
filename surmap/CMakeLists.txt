if (${EMSCRIPTEN})
	set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Oz -s USE_ZLIB=1 -ffast-math -fno-exceptions -w -Werror=return-type -Werror=switch")
	set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS}  -Oz -s USE_ZLIB=1 -ffast-math -fno-exceptions -w -Werror=return-type -Werror=switch")
	set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} \
		-s USE_ZLIB=1 \
        -Oz \
        --emit-symbol-map \
        -s ASSERTIONS=0 \
        -s SAFE_HEAP=0 \
        -s TOTAL_MEMORY=134217728 \
        -s ALLOW_MEMORY_GROWTH=1 \
        -s TOTAL_STACK=1MB \
        -s INVOKE_RUN=0 \
        -s EXTRA_EXPORTED_RUNTIME_METHODS=\"['addRunDependency', 'removeRunDependency', 'FS_createPath', 'FS_createPreloadedFile', \
          'FS_createDataFile', 'FS_cwd', 'FS_chdir', 'lengthBytesUTF8', 'stringToUTF8', 'UTF16ToString', 'callMain']\" \
        -s EXPORTED_FUNCTIONS=\"['_main', '_malloc', '_free']\" \
        -s NO_EXIT_RUNTIME=1 \
        -s FORCE_FILESYSTEM=1 \
        -s ERROR_ON_UNDEFINED_SYMBOLS=1 \
		--preload-file \"${PROJECT_SOURCE_DIR}/surmap_data@\"")
endif()

INCLUDE_DIRECTORIES(AFTER
	"${PROJECT_SOURCE_DIR}/lib/xtool"
	"${PROJECT_SOURCE_DIR}/lib/xgraph"
	"${PROJECT_SOURCE_DIR}")
INCLUDE_DIRECTORIES(BEFORE
	"${CMAKE_CURRENT_LIST_DIR}/libzip/include/"
	"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/"
	"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/")

SET(surmap_SRCS
	3d_shape.cpp
	dsidernd.cpp
	impass.cpp
	siderend.cpp
	sqexp.cpp
	sqibody.cpp
	sqicore.cpp
	sqimenu.cpp
	surmap.cpp
	tools.cpp
	track.cpp
	world.cpp

	missed.cpp
)

SET_SOURCE_FILES_PROPERTIES(${surmap_SRCS}
		PROPERTIES COMPILE_FLAGS
		"-Wno-parentheses -Wno-unused-variable -Wno-unused-parameter -Wno-register -Wno-dangling-else \
		 -Werror=missing-field-initializers -Werror=uninitialized")

SET(vangers_surmap_SRCS
	"${PROJECT_SOURCE_DIR}/src/3d/3dobject.cpp"
	"${PROJECT_SOURCE_DIR}/src/3d/3d_math.cpp"
	"${PROJECT_SOURCE_DIR}/src/3d/3dgraph.cpp"
	"${PROJECT_SOURCE_DIR}/src/3d/dynamics.cpp"
	"${PROJECT_SOURCE_DIR}/src/3d/optimize.cpp"


	"${PROJECT_SOURCE_DIR}/src/terra/land.cpp"
	"${PROJECT_SOURCE_DIR}/src/terra/splay.cpp"
	"${PROJECT_SOURCE_DIR}/src/terra/vmap.cpp"
	"${PROJECT_SOURCE_DIR}/src/units/moveland.cpp"

	"${PROJECT_SOURCE_DIR}/src/palette.cpp"
	"${PROJECT_SOURCE_DIR}/src/dast/poly3d.cpp"

	"${PROJECT_SOURCE_DIR}/src/rle.cpp"
)

SET(libzip_SRCS
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_add_entry.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_new.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_dir_add.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_set_default_password.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_extra_field_api.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_set_file_comment.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_strerror.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_layered.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_set_name.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_rename.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_set_external_attributes.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_replace.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_err_str.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_algorithm_deflate.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_begin_write.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_error_get.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_get_num_files.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_hash.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_add.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_fseek.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_zip.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_extra_field.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_zip_new.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_random_unix.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_get_compression_flags.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_entry.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_set_file_compression.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_unchange.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_rename.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_fopen_index_encrypted.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_error_get_sys_type.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_free.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_close.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_get_external_attributes.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_libzip_version.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_commit_write.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_utf-8.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_delete.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_write.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_function.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_unchange_archive.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_fdopen.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/mkstemp.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_error_get.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_set_comment.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_get_offset.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_is_deleted.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_get_file_comment.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_memdup.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_set_archive_comment.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_discard.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_get_archive_flag.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_error_clear.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_io_util.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_rollback_write.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_error_to_str.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_seek_write.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_begin_write_cloning.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_error_clear.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_fclose.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_crc.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_ftell.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_filep.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_seek.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_get_name.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_strerror.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_fopen_index.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_pkware.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_tell_write.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_call.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_buffer.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_add_dir.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_set_archive_flag.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_filerange_crc.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_compress.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_get_num_entries.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_file.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_add.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_buffer.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_stat.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_get_comment.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_error.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_name_locate.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_unchange_all.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_fread.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_file_set_mtime.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_error.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_replace.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_fopen.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_close.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_get_encryption_implementation.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_progress.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_remove.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_stat.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_supports.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_string.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_unchange_data.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_get_archive_comment.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_stat_index.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_dirent.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_open.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_read.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_error_strerror.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_open.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_window.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_stat_init.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip-1.5/lib/zip_source_tell.c"
		"${CMAKE_CURRENT_LIST_DIR}/libzip/libzip.c"
		)

ADD_EXECUTABLE(surmap ${surmap_SRCS} ${vangers_surmap_SRCS} ${libzip_SRCS})
SET_SOURCE_FILES_PROPERTIES(${vangers_surmap_SRCS}
		PROPERTIES COMPILE_FLAGS
		"-Wno-parentheses -Wno-unused-variable -Wno-unused-parameter -Wno-dangling-else")

TARGET_COMPILE_DEFINITIONS(surmap PUBLIC _SURMAP_ _SURMAP_ROUGH_)


if(${EMSCRIPTEN})
	TARGET_LINK_LIBRARIES(surmap ${SDL2_LIBRARY} xtool xgraph)
	set_target_properties(surmap
			PROPERTIES
			RUNTIME_OUTPUT_DIRECTORY "${PROJECT_SOURCE_DIR}/surweb/public/surmap"
	)
else()
	TARGET_LINK_LIBRARIES(surmap ${SDL2_LIBRARY} xtool xgraph z)
endif()

