SET(CMAKE_OSX_DEPLOYMENT_TARGET "10.12" CACHE STRING "Minimum OS X deployment version")
CMAKE_MINIMUM_REQUIRED(VERSION 3.1.0)

# root
PROJECT(vangers)

# modules
SET(CMAKE_MODULE_PATH ${PROJECT_SOURCE_DIR}/cmake)

# options
OPTION(BINARY_SCRIPT "Use binary script for interface" ON)
OPTION(DIAGEN_TEST "Dialog generator and test subsystem" OFF)

# hide optons
OPTION(ACTINT "Actint user interface in road game" ON)

SET(CMAKE_CONFIGURATION_TYPES "Release;Debug;MinSizeRel;RelWithDebInfo")
IF(MINGW)
		SET(CMAKE_FIND_LIBRARY_SUFFIXES ".dll")
ENDIF()

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# depends
if (${EMSCRIPTEN})
	set(SDL2_FOUND TRUE)
	set(SDL2_INCLUDE_DIRS "${EMSCRIPTEN_ROOT_PATH}/system/include/SDL2/")
	set(SDL2_LIBRARIES "nul")
	set(USE_FLAGS "-s USE_SDL=2")
	set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${USE_FLAGS}")
	set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${USE_FLAGS}")
	set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${USE_FLAGS}")
	set(CMAKE_EXECUTABLE_SUFFIX .js)
	include_directories("${CMAKE_CURRENT_LIST_DIR}/surmap/eminclude")
else()
	FIND_PACKAGE(SDL2 REQUIRED)
	FIND_PACKAGE(ZLIB REQUIRED)
endif()

set(WINDOWS_RES "../vangers.res")

IF(BINARY_SCRIPT)
	ADD_DEFINITIONS(-D_BINARY_SCRIPT_)
ENDIF(BINARY_SCRIPT)

IF(ACTINT)
	ADD_DEFINITIONS(-DACTINT)
ENDIF(ACTINT)

IF(DIAGEN_TEST)
	ADD_DEFINITIONS(-DDIAGEN_TEST)
ENDIF(DIAGEN_TEST)

# globals
INCLUDE_DIRECTORIES(SYSTEM
	${ZLIB_INCLUDE_DIR}
	${SDL2_INCLUDE_DIR}
	${SDL2_NET_INCLUDE_DIRS}
	${FFMPEG_INCLUDE_DIRS}
	${CLUNK_INCLUDE_DIR}
	${OGG_INCLUDE_DIR}
	${VORBIS_INCLUDE_DIR}
	${VORBISFILE_INCLUDE_DIR}
	${STEAM_INCLUDE_DIR}
)

INCLUDE(CheckCXXCompilerFlag)
SET(CMAKE_CXX_FLAGS_DEBUG "-g -Wall -Wextra -fno-exceptions")
SET(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS} -O2 -ftree-vectorize -ffast-math -fno-exceptions")
CHECK_CXX_COMPILER_FLAG("-msse2" HAVE_SIMDSSE)
IF(HAVE_SIMDSSE)
  SET(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -msse2")
ENDIF()
# For modern gcc
add_definitions(-D_USE_MATH_DEFINES)

add_compile_options(-Werror=shift-negative-value)
add_compile_options(-Werror=dangling-else)
add_compile_options(-Werror=parentheses)
add_compile_options(-Werror=delete-non-virtual-dtor)
add_compile_options(-Werror=write-strings)

if (CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
	add_compile_options(-Werror=mismatched-new-delete )
endif()

# subdirs
ADD_SUBDIRECTORY("lib/xgraph")
ADD_SUBDIRECTORY("lib/xtool")
ADD_SUBDIRECTORY("surmap")
