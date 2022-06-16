# SurWeb Editor #

[![SurWeb Linux Build](https://github.com/caiiiycuk/vangers-web/actions/workflows/vangers_linux_build.yml/badge.svg?branch=surweb)](https://github.com/caiiiycuk/vangers-web/actions/workflows/vangers_linux_build.yml)
[![SurWeb Emscripten Build](https://github.com/caiiiycuk/vangers-web/actions/workflows/vangers_em_build.yml/badge.svg?branch=surweb)](https://github.com/caiiiycuk/vangers-web/actions/workflows/vangers_em_build.yml)

![SurWeb](https://user-images.githubusercontent.com/1727152/119936527-8537a600-bfb3-11eb-834a-38c48de262ad.jpg)

https://caiiiycuk.github.io/vangers-web/surweb/index.html

## How to build

1. Install emsdk and latest emscripten
```sh
    git clone --depth 1 https://github.com/emscripten-core/emsdk.git emsdk
    cd emsdk
    ./emsdk install latest
    ./emsdk activate latest
    source emsdk_env.sh
```

2. Build web version of surmap
```sh
    mkdir emscripten
    cd emscripten
    emcmake cmake ..
    make surmap
```

3. Build frontend
```sh
   cd surweb
   yarn
   yarn build
```

4. Testing locally

Run `yarn start`

## Data

Preloaded data is located in folder `surmap_data`. Everything from this folder will be available in web version.

To build data execute
```shell
make data
```

