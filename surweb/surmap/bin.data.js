
  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = '/Volumes/macext/caiiiycuk/vangers-web/surweb/public/surmap/bin.data';
      var REMOTE_PACKAGE_BASE = 'bin.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "idbfs", true, true);
Module['FS_createPath']("/idbfs", "_palette", true, true);
Module['FS_createPath']("/idbfs", "bitmap", true, true);
Module['FS_createPath']("/idbfs/bitmap", "mosaic", true, true);
Module['FS_createPath']("/idbfs", "shape3d", true, true);
Module['FS_createPath']("/idbfs", "thechain", true, true);
Module['FS_createPath']("/idbfs/thechain", "mirage", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency']('fp ' + that.name);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_/Volumes/macext/caiiiycuk/vangers-web/surweb/public/surmap/bin.data');

      };
      Module['addRunDependency']('datafile_/Volumes/macext/caiiiycuk/vangers-web/surweb/public/surmap/bin.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/idbfs/LEVEL.IBM", "start": 0, "end": 680933}, {"filename": "/idbfs/SURMAP.FNT", "start": 680933, "end": 685037}, {"filename": "/idbfs/_palette/ark-a-znoy.pal", "start": 685037, "end": 685805}, {"filename": "/idbfs/_palette/boozeena.pal", "start": 685805, "end": 686573}, {"filename": "/idbfs/_palette/fostral.pal", "start": 686573, "end": 687341}, {"filename": "/idbfs/_palette/glorx.pal", "start": 687341, "end": 688109}, {"filename": "/idbfs/_palette/hmok.pal", "start": 688109, "end": 688877}, {"filename": "/idbfs/_palette/knox.pal", "start": 688877, "end": 689645}, {"filename": "/idbfs/_palette/necross.pal", "start": 689645, "end": 690413}, {"filename": "/idbfs/_palette/threall.pal", "start": 690413, "end": 691181}, {"filename": "/idbfs/_palette/weexow.pal", "start": 691181, "end": 691949}, {"filename": "/idbfs/_palette/xplo.pal", "start": 691949, "end": 692717}, {"filename": "/idbfs/bitmap/buka.bmp", "start": 692717, "end": 811693}, {"filename": "/idbfs/bitmap/buka.pal", "start": 811693, "end": 812461}, {"filename": "/idbfs/bitmap/coin.bmp", "start": 812461, "end": 826865}, {"filename": "/idbfs/bitmap/coin.pal", "start": 826865, "end": 827057}, {"filename": "/idbfs/bitmap/coin2.bmp", "start": 827057, "end": 884661}, {"filename": "/idbfs/bitmap/coin2.pal", "start": 884661, "end": 884853}, {"filename": "/idbfs/bitmap/coin3.bmp", "start": 884853, "end": 923273}, {"filename": "/idbfs/bitmap/coin3.pal", "start": 923273, "end": 923465}, {"filename": "/idbfs/bitmap/lady.bmp", "start": 923465, "end": 1230669}, {"filename": "/idbfs/bitmap/lady.pal", "start": 1230669, "end": 1230861}, {"filename": "/idbfs/bitmap/lava0.bmp", "start": 1230861, "end": 1493009}, {"filename": "/idbfs/bitmap/lava0.pal", "start": 1493009, "end": 1493201}, {"filename": "/idbfs/bitmap/lava1.bmp", "start": 1493201, "end": 1743205}, {"filename": "/idbfs/bitmap/lava1.pal", "start": 1743205, "end": 1743397}, {"filename": "/idbfs/bitmap/lava2.bmp", "start": 1743397, "end": 1993401}, {"filename": "/idbfs/bitmap/lava2.pal", "start": 1993401, "end": 1993593}, {"filename": "/idbfs/bitmap/lava3.bmp", "start": 1993593, "end": 2255741}, {"filename": "/idbfs/bitmap/lava3.pal", "start": 2255741, "end": 2255933}, {"filename": "/idbfs/bitmap/lava4.bmp", "start": 2255933, "end": 2518081}, {"filename": "/idbfs/bitmap/lava4.pal", "start": 2518081, "end": 2518273}, {"filename": "/idbfs/bitmap/mage.bmp", "start": 2518273, "end": 2583813}, {"filename": "/idbfs/bitmap/mage.pal", "start": 2583813, "end": 2584581}, {"filename": "/idbfs/bitmap/mosaic/rocks.bmp", "start": 2584581, "end": 2682889}, {"filename": "/idbfs/bitmap/mosaic/rocks2.bmp", "start": 2682889, "end": 2707469}, {"filename": "/idbfs/bitmap/mosaic/rocks4.bmp", "start": 2707469, "end": 2713617}, {"filename": "/idbfs/bitmap/mosaic/stone.bmp", "start": 2713617, "end": 2953237}, {"filename": "/idbfs/bitmap/mosaic/stone.pal", "start": 2953237, "end": 2954005}, {"filename": "/idbfs/bitmap/title.bmp", "start": 2954005, "end": 3722217}, {"filename": "/idbfs/bitmap/title.pal", "start": 3722217, "end": 3722313}, {"filename": "/idbfs/bitmap/vaga.bmp", "start": 3722313, "end": 3787853}, {"filename": "/idbfs/bitmap/vaga.pal", "start": 3787853, "end": 3788621}, {"filename": "/idbfs/impass.dat", "start": 3788621, "end": 3788781}, {"filename": "/idbfs/shape3d/conus.c3d", "start": 3788781, "end": 3895672}, {"filename": "/idbfs/shape3d/cylinder.c3d", "start": 3895672, "end": 3916935}, {"filename": "/idbfs/shape3d/elipsoid.c3d", "start": 3916935, "end": 4140597}, {"filename": "/idbfs/shape3d/piramid.c3d", "start": 4140597, "end": 4144240}, {"filename": "/idbfs/shape3d/sphere.c3d", "start": 4144240, "end": 4382700}, {"filename": "/idbfs/shape3d/square.c3d", "start": 4382700, "end": 4385310}, {"filename": "/idbfs/shape3d/tor.c3d", "start": 4385310, "end": 4588529}, {"filename": "/idbfs/shape3d/tube.c3d", "start": 4588529, "end": 4622339}, {"filename": "/idbfs/shape3d/u1.c3d", "start": 4622339, "end": 4715184}, {"filename": "/idbfs/shape3d/u2.c3d", "start": 4715184, "end": 4803071}, {"filename": "/idbfs/thechain/mirage/harmony.pal", "start": 4803071, "end": 4803839}, {"filename": "/idbfs/thechain/mirage/level.lst", "start": 4803839, "end": 4804168}, {"filename": "/idbfs/thechain/mirage/location.lst", "start": 4804168, "end": 4804201}, {"filename": "/idbfs/thechain/mirage/output.vmp", "start": 4804201, "end": 8998505}, {"filename": "/idbfs/thechain/mirage/output.vpr", "start": 8998505, "end": 8999829}, {"filename": "/idbfs/thechain/mirage/terrain.prm", "start": 8999829, "end": 8999952}, {"filename": "/idbfs/thechain/mirage/track0.bnl", "start": 8999952, "end": 9016983}, {"filename": "/idbfs/thechain/mirage/world.ini", "start": 9016983, "end": 9017812}, {"filename": "/idbfs/wrlds.dat", "start": 9017812, "end": 9017852}], "remote_package_size": 9017852});

  })();
