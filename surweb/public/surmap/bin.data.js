
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
      var PACKAGE_NAME = '/home/caiiiycuk/gamepix/games/vangers-web/surweb/public/surmap/bin.data';
      var REMOTE_PACKAGE_BASE = 'bin.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;

      var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];
      var PACKAGE_UUID = metadata['package_uuid'];

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
Module['FS_createPath']("/idbfs", "shape3d", true, true);
Module['FS_createPath']("/idbfs", "thechain", true, true);
Module['FS_createPath']("/idbfs/thechain", "mirage", true, true);
Module['FS_createPath']("/idbfs", "bitmap", true, true);
Module['FS_createPath']("/idbfs/bitmap", "mosaic", true, true);
Module['FS_createPath']("/idbfs", "_palette", true, true);

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
        assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_/home/caiiiycuk/gamepix/games/vangers-web/surweb/public/surmap/bin.data');

      };
      Module['addRunDependency']('datafile_/home/caiiiycuk/gamepix/games/vangers-web/surweb/public/surmap/bin.data');

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
    loadPackage({"files": [{"filename": "/idbfs/SURMAP.FNT", "start": 0, "end": 4104}, {"filename": "/idbfs/impass.dat", "start": 4104, "end": 4264}, {"filename": "/idbfs/LEVEL.IBM", "start": 4264, "end": 685197}, {"filename": "/idbfs/wrlds.dat", "start": 685197, "end": 685237}, {"filename": "/idbfs/shape3d/piramid.c3d", "start": 685237, "end": 688880}, {"filename": "/idbfs/shape3d/tube.c3d", "start": 688880, "end": 722690}, {"filename": "/idbfs/shape3d/u2.c3d", "start": 722690, "end": 810577}, {"filename": "/idbfs/shape3d/elipsoid.c3d", "start": 810577, "end": 1034239}, {"filename": "/idbfs/shape3d/sphere.c3d", "start": 1034239, "end": 1272699}, {"filename": "/idbfs/shape3d/conus.c3d", "start": 1272699, "end": 1379590}, {"filename": "/idbfs/shape3d/cylinder.c3d", "start": 1379590, "end": 1400853}, {"filename": "/idbfs/shape3d/square.c3d", "start": 1400853, "end": 1403463}, {"filename": "/idbfs/shape3d/tor.c3d", "start": 1403463, "end": 1606682}, {"filename": "/idbfs/shape3d/u1.c3d", "start": 1606682, "end": 1699527}, {"filename": "/idbfs/thechain/mirage/world.ini", "start": 1699527, "end": 1700356}, {"filename": "/idbfs/thechain/mirage/terrain.prm", "start": 1700356, "end": 1700479}, {"filename": "/idbfs/thechain/mirage/location.lst", "start": 1700479, "end": 1700512}, {"filename": "/idbfs/thechain/mirage/level.lst", "start": 1700512, "end": 1700841}, {"filename": "/idbfs/thechain/mirage/output.vpr", "start": 1700841, "end": 1702165}, {"filename": "/idbfs/thechain/mirage/output.vmp", "start": 1702165, "end": 5896469}, {"filename": "/idbfs/thechain/mirage/track0.bnl", "start": 5896469, "end": 5913500}, {"filename": "/idbfs/thechain/mirage/harmony.pal", "start": 5913500, "end": 5914268}, {"filename": "/idbfs/bitmap/buka.bmp", "start": 5914268, "end": 6033244}, {"filename": "/idbfs/bitmap/lava1.bmp", "start": 6033244, "end": 6283248}, {"filename": "/idbfs/bitmap/mage.pal", "start": 6283248, "end": 6284016}, {"filename": "/idbfs/bitmap/vaga.pal", "start": 6284016, "end": 6284784}, {"filename": "/idbfs/bitmap/lava2.bmp", "start": 6284784, "end": 6534788}, {"filename": "/idbfs/bitmap/title.bmp", "start": 6534788, "end": 7303000}, {"filename": "/idbfs/bitmap/lava4.pal", "start": 7303000, "end": 7303192}, {"filename": "/idbfs/bitmap/coin.bmp", "start": 7303192, "end": 7317596}, {"filename": "/idbfs/bitmap/lava1.pal", "start": 7317596, "end": 7317788}, {"filename": "/idbfs/bitmap/coin.pal", "start": 7317788, "end": 7317980}, {"filename": "/idbfs/bitmap/lava4.bmp", "start": 7317980, "end": 7580128}, {"filename": "/idbfs/bitmap/lava2.pal", "start": 7580128, "end": 7580320}, {"filename": "/idbfs/bitmap/title.pal", "start": 7580320, "end": 7580416}, {"filename": "/idbfs/bitmap/mage.bmp", "start": 7580416, "end": 7645956}, {"filename": "/idbfs/bitmap/lady.pal", "start": 7645956, "end": 7646148}, {"filename": "/idbfs/bitmap/coin2.pal", "start": 7646148, "end": 7646340}, {"filename": "/idbfs/bitmap/coin3.pal", "start": 7646340, "end": 7646532}, {"filename": "/idbfs/bitmap/vaga.bmp", "start": 7646532, "end": 7712072}, {"filename": "/idbfs/bitmap/lava3.pal", "start": 7712072, "end": 7712264}, {"filename": "/idbfs/bitmap/lava3.bmp", "start": 7712264, "end": 7974412}, {"filename": "/idbfs/bitmap/lady.bmp", "start": 7974412, "end": 8281616}, {"filename": "/idbfs/bitmap/lava0.bmp", "start": 8281616, "end": 8543764}, {"filename": "/idbfs/bitmap/buka.pal", "start": 8543764, "end": 8544532}, {"filename": "/idbfs/bitmap/lava0.pal", "start": 8544532, "end": 8544724}, {"filename": "/idbfs/bitmap/coin3.bmp", "start": 8544724, "end": 8583144}, {"filename": "/idbfs/bitmap/coin2.bmp", "start": 8583144, "end": 8640748}, {"filename": "/idbfs/bitmap/mosaic/rocks.bmp", "start": 8640748, "end": 8739056}, {"filename": "/idbfs/bitmap/mosaic/rocks2.bmp", "start": 8739056, "end": 8763636}, {"filename": "/idbfs/bitmap/mosaic/stone.pal", "start": 8763636, "end": 8764404}, {"filename": "/idbfs/bitmap/mosaic/rocks4.bmp", "start": 8764404, "end": 8770552}, {"filename": "/idbfs/bitmap/mosaic/stone.bmp", "start": 8770552, "end": 9010172}, {"filename": "/idbfs/_palette/ark-a-znoy.pal", "start": 9010172, "end": 9010940}, {"filename": "/idbfs/_palette/necross.pal", "start": 9010940, "end": 9011708}, {"filename": "/idbfs/_palette/hmok.pal", "start": 9011708, "end": 9012476}, {"filename": "/idbfs/_palette/threall.pal", "start": 9012476, "end": 9013244}, {"filename": "/idbfs/_palette/xplo.pal", "start": 9013244, "end": 9014012}, {"filename": "/idbfs/_palette/knox.pal", "start": 9014012, "end": 9014780}, {"filename": "/idbfs/_palette/boozeena.pal", "start": 9014780, "end": 9015548}, {"filename": "/idbfs/_palette/fostral.pal", "start": 9015548, "end": 9016316}, {"filename": "/idbfs/_palette/glorx.pal", "start": 9016316, "end": 9017084}, {"filename": "/idbfs/_palette/weexow.pal", "start": 9017084, "end": 9017852}], "remote_package_size": 9017852, "package_uuid": "80585e14-e97a-436a-9e73-01efcac8b587"});

  })();
