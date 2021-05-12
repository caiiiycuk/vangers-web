if (${EMSCRIPTEN})
	set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Oz -ffast-math -fno-exceptions -w -Werror=return-type -Werror=switch")
	set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS}  -Oz -ffast-math -fno-exceptions -w -Werror=return-type -Werror=switch")
	set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} \
        -Oz \
        --emit-symbol-map \
        -s ASSERTIONS=0 \
        -s SAFE_HEAP=0 \
        -s TOTAL_MEMORY=134217728 \
        -s ALLOW_MEMORY_GROWTH=1 \
        -s TOTAL_STACK=1MB \
        -s INVOKE_RUN=1 \
        -s EXTRA_EXPORTED_RUNTIME_METHODS=\"['addRunDependency', 'removeRunDependency', 'FS_createPath', 'FS_createPreloadedFile', \
          'FS_createDataFile', 'lengthBytesUTF8', 'stringToUTF8', 'UTF16ToString', 'callMain']\" \
        -s NO_EXIT_RUNTIME=1 \
        -s FORCE_FILESYSTEM=1 \
        -s ERROR_ON_UNDEFINED_SYMBOLS=1 \
		--preload-file \"${CMAKE_CURRENT_LIST_DIR}/../surmap_data@\"")
endif()

INCLUDE_DIRECTORIES(AFTER
	"${PROJECT_SOURCE_DIR}/lib/xtool"
	"${PROJECT_SOURCE_DIR}/lib/xgraph"
	"${PROJECT_SOURCE_DIR}"
)

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

ADD_EXECUTABLE(surmap ${surmap_SRCS} ${vangers_surmap_SRCS})
SET_SOURCE_FILES_PROPERTIES(${vangers_surmap_SRCS}
		PROPERTIES COMPILE_FLAGS
		"-Wno-parentheses -Wno-unused-variable -Wno-unused-parameter -Wno-dangling-else")

TARGET_COMPILE_DEFINITIONS(surmap PUBLIC _SURMAP_ _SURMAP_ROUGH_)

TARGET_LINK_LIBRARIES(surmap
	${SDL2_LIBRARY}
	xtool
	xgraph
)

