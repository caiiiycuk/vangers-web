
  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }
  Module.expectedDataFileDownloads++;
  (function() {
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
        if (typeof process === 'object') {
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
      
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['removeRunDependency']('fp ' + that.name);
  
              this.requests[this.name] = null;
            }
          };
      
              var files = metadata['files'];
              for (var i = 0; i < files.length; ++i) {
                new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio']).open('GET', files[i]['filename']);
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
            }
                Module['removeRunDependency']('datafile_/home/caiiiycuk/gamepix/games/vangers-web/surweb/public/surmap/bin.data');

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
   loadPackage({"files": [{"filename": "/idbfs/SURMAP.FNT", "start": 0, "end": 4104, "audio": 0}, {"filename": "/idbfs/impass.dat", "start": 4104, "end": 4264, "audio": 0}, {"filename": "/idbfs/LEVEL.IBM", "start": 4264, "end": 685197, "audio": 0}, {"filename": "/idbfs/wrlds.dat", "start": 685197, "end": 685237, "audio": 0}, {"filename": "/idbfs/shape3d/u2.c3d", "start": 685237, "end": 773124, "audio": 0}, {"filename": "/idbfs/shape3d/u1.c3d", "start": 773124, "end": 865969, "audio": 0}, {"filename": "/idbfs/thechain/mirage/world.ini", "start": 865969, "end": 866798, "audio": 0}, {"filename": "/idbfs/thechain/mirage/terrain.prm", "start": 866798, "end": 866921, "audio": 0}, {"filename": "/idbfs/thechain/mirage/location.lst", "start": 866921, "end": 866954, "audio": 0}, {"filename": "/idbfs/thechain/mirage/level.lst", "start": 866954, "end": 867283, "audio": 0}, {"filename": "/idbfs/thechain/mirage/output.vpr", "start": 867283, "end": 868607, "audio": 0}, {"filename": "/idbfs/thechain/mirage/output.vmp", "start": 868607, "end": 5062911, "audio": 0}, {"filename": "/idbfs/thechain/mirage/track0.bnl", "start": 5062911, "end": 5079942, "audio": 0}, {"filename": "/idbfs/thechain/mirage/harmony.pal", "start": 5079942, "end": 5080710, "audio": 0}, {"filename": "/idbfs/bitmap/buka.bmp", "start": 5080710, "end": 5199686, "audio": 0}, {"filename": "/idbfs/bitmap/lava1.bmp", "start": 5199686, "end": 5449690, "audio": 0}, {"filename": "/idbfs/bitmap/mage.pal", "start": 5449690, "end": 5450458, "audio": 0}, {"filename": "/idbfs/bitmap/vaga.pal", "start": 5450458, "end": 5451226, "audio": 0}, {"filename": "/idbfs/bitmap/lava2.bmp", "start": 5451226, "end": 5701230, "audio": 0}, {"filename": "/idbfs/bitmap/title.bmp", "start": 5701230, "end": 6469442, "audio": 0}, {"filename": "/idbfs/bitmap/lava4.pal", "start": 6469442, "end": 6469634, "audio": 0}, {"filename": "/idbfs/bitmap/coin.bmp", "start": 6469634, "end": 6484038, "audio": 0}, {"filename": "/idbfs/bitmap/lava1.pal", "start": 6484038, "end": 6484230, "audio": 0}, {"filename": "/idbfs/bitmap/coin.pal", "start": 6484230, "end": 6484422, "audio": 0}, {"filename": "/idbfs/bitmap/lava4.bmp", "start": 6484422, "end": 6746570, "audio": 0}, {"filename": "/idbfs/bitmap/lava2.pal", "start": 6746570, "end": 6746762, "audio": 0}, {"filename": "/idbfs/bitmap/title.pal", "start": 6746762, "end": 6746858, "audio": 0}, {"filename": "/idbfs/bitmap/mage.bmp", "start": 6746858, "end": 6812398, "audio": 0}, {"filename": "/idbfs/bitmap/lady.pal", "start": 6812398, "end": 6812590, "audio": 0}, {"filename": "/idbfs/bitmap/coin2.pal", "start": 6812590, "end": 6812782, "audio": 0}, {"filename": "/idbfs/bitmap/coin3.pal", "start": 6812782, "end": 6812974, "audio": 0}, {"filename": "/idbfs/bitmap/vaga.bmp", "start": 6812974, "end": 6878514, "audio": 0}, {"filename": "/idbfs/bitmap/lava3.pal", "start": 6878514, "end": 6878706, "audio": 0}, {"filename": "/idbfs/bitmap/lava3.bmp", "start": 6878706, "end": 7140854, "audio": 0}, {"filename": "/idbfs/bitmap/lady.bmp", "start": 7140854, "end": 7448058, "audio": 0}, {"filename": "/idbfs/bitmap/lava0.bmp", "start": 7448058, "end": 7710206, "audio": 0}, {"filename": "/idbfs/bitmap/buka.pal", "start": 7710206, "end": 7710974, "audio": 0}, {"filename": "/idbfs/bitmap/lava0.pal", "start": 7710974, "end": 7711166, "audio": 0}, {"filename": "/idbfs/bitmap/coin3.bmp", "start": 7711166, "end": 7749586, "audio": 0}, {"filename": "/idbfs/bitmap/coin2.bmp", "start": 7749586, "end": 7807190, "audio": 0}, {"filename": "/idbfs/bitmap/mosaic/rocks.bmp", "start": 7807190, "end": 7905498, "audio": 0}, {"filename": "/idbfs/bitmap/mosaic/rocks2.bmp", "start": 7905498, "end": 7930078, "audio": 0}, {"filename": "/idbfs/bitmap/mosaic/stone.pal", "start": 7930078, "end": 7930846, "audio": 0}, {"filename": "/idbfs/bitmap/mosaic/rocks4.bmp", "start": 7930846, "end": 7936994, "audio": 0}, {"filename": "/idbfs/bitmap/mosaic/stone.bmp", "start": 7936994, "end": 8176614, "audio": 0}, {"filename": "/idbfs/_palette/ark-a-znoy.pal", "start": 8176614, "end": 8177382, "audio": 0}, {"filename": "/idbfs/_palette/necross.pal", "start": 8177382, "end": 8178150, "audio": 0}, {"filename": "/idbfs/_palette/hmok.pal", "start": 8178150, "end": 8178918, "audio": 0}, {"filename": "/idbfs/_palette/threall.pal", "start": 8178918, "end": 8179686, "audio": 0}, {"filename": "/idbfs/_palette/xplo.pal", "start": 8179686, "end": 8180454, "audio": 0}, {"filename": "/idbfs/_palette/knox.pal", "start": 8180454, "end": 8181222, "audio": 0}, {"filename": "/idbfs/_palette/boozeena.pal", "start": 8181222, "end": 8181990, "audio": 0}, {"filename": "/idbfs/_palette/fostral.pal", "start": 8181990, "end": 8182758, "audio": 0}, {"filename": "/idbfs/_palette/glorx.pal", "start": 8182758, "end": 8183526, "audio": 0}, {"filename": "/idbfs/_palette/weexow.pal", "start": 8183526, "end": 8184294, "audio": 0}], "remote_package_size": 8184294, "package_uuid": "66c03f36-5d2d-4b2a-ab6f-8ac569191557"});
  
  })();
  