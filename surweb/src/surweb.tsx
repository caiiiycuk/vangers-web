import { Alignment, AnchorButton, Button, FileInput, Intent, Navbar, ResizeEntry, ResizeSensor, Spinner, Overlay } from "@blueprintjs/core";
import React, { useEffect, useRef, useState } from 'react';
import { Ron } from "./ron";
import { AppProps } from './router';
import './surweb.css';
import { resolveUrl } from './xhr';
import { worldFile, palFile, bitmapFolder, shapeFolder } from "./config";


const WIDTH = 1280;
const HEIGHT = 720;

type Binaries = { dataJs: Uint8Array, data: Uint8Array, wasm: Uint8Array, wasmJs: Uint8Array };

export function SurWeb(props: AppProps) {
  const module = useState<any>(() => {
    const module = {};
    (window as any).module = module;
    return module;
  })[0];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [binaries, setBinaries] = useState<Binaries | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [archiveUrl, setArchiveUrl] = useState<string | null>(null);
  const [fileProgress, setFileProgress] = useState<number>(0);
  const [reader, setReader] = useState<FileReader | null>(null);
  const [ron, setRon] = useState<boolean>(false);

  useEffect(() => {
    async function doLoad() {
      const [dataJs, data, wasm, wasmJs] = await Promise.all([
        resolveUrl("surmap/bin.data.js", setProgress),
        resolveUrl("surmap/bin.data", setProgress),
        resolveUrl("surmap/surmap.wasm"),
        resolveUrl("surmap/surmap.js")]);

      setBinaries({ dataJs, data, wasm, wasmJs });
    };

    doLoad().catch(console.error);
  }, []);

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvas = canvasRef.current;
      const rect = (canvas.parentElement as HTMLElement).getBoundingClientRect();
      setCanvas(canvas);

      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      resizeCanvas(canvas, rect.width, rect.height);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvas === null || binaries === null) {
      return;
    }

    instantiateWasm(canvas, binaries, module, onArchive, (data) => savePng("poster.png", data), props)
      .then(() => setLoaded(true))
      .catch(console.error);

    // eslint-disable-next-line
  }, [canvas, binaries, module]);

  function onResize(e: ResizeEntry[]) {
    if (canvas !== null) {
      resizeCanvas(canvas, e[0].contentRect.width, e[0].contentRect.height);
    }
  }

  function onArchive(archive: Uint8Array) {
    if (archiveUrl !== null) {
      URL.revokeObjectURL(archiveUrl);
    }

    const blob = new Blob([archive], {
      type: "application/zip"
    });
    const url = URL.createObjectURL(blob);
    setArchiveUrl(url);
    // downloadUrl(url);
  }

  function savePng(fileName: string, byte: Uint8Array) {
    var blob = new Blob([byte], { type: "image/png" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  function onDownload() {
    canvas?.focus();

    if (archiveUrl !== null) {
      downloadUrl(archiveUrl);
    }
  }

  function onUpload(e: any) {
    canvas?.focus();

    const files = e.currentTarget.files as FileList;
    if (files.length === 0) {
      setReader(null);
      return;
    }

    const file = files[0];
    const reader = new FileReader();
    reader.addEventListener("load", async (e) => {
      const bytes = new Uint8Array(reader.result as ArrayBuffer);
      const FS = module.FS;
      const root = FS.cwd() + "/";
      if (file.name.endsWith(".bmp") || file.name.endsWith(".pal")) {
        try {
          FS.unlink(root + bitmapFolder + file.name);
        } catch {
          //
        }
        FS.createDataFile(root, bitmapFolder + file.name, bytes, true, true, true);
        FS.syncfs((err: any) => { });
        alert("Ok");
      } else if (file.name.endsWith(".c3d")) {
        try {
          FS.unlink(root + shapeFolder + file.name);
        } catch {
          //
        }
        FS.createDataFile(root, shapeFolder + file.name, bytes, true, true, true);
        FS.syncfs((err: any) => { });
        alert("Ok");
      } else {
        alert("Only bmp / c3d / pal files are supported");
      }
      setReader(null);
    });
    reader.addEventListener("progress", (e) => setFileProgress(e.loaded / e.total));
    reader.readAsArrayBuffer(file);
    setReader(reader);
  }

  return (
    <div className="surweb-container">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading><AnchorButton intent={Intent.PRIMARY} minimal={true} onClick={() => window.location.reload()}>SurWeb</AnchorButton></Navbar.Heading>
          <Navbar.Divider />
          {
            loaded ?
              <div className="file-container">
                <FileInput disabled={reader !== null} text="Add file" onInputChange={onUpload} />
                &nbsp;&nbsp;
                <Spinner size={16} intent={Intent.PRIMARY} value={fileProgress} />
              </div> :
              <Navbar.Heading>Loading {progress}%</Navbar.Heading>
          }
          {loaded ?
            <Button minimal={true} onKeyDown={() => { }} onClick={() => setRon(!ron)}>RON</Button> :
            null
          }
          {
            archiveUrl !== null ?
              <Button intent={Intent.PRIMARY} onKeyDown={() => { }} minimal={true} onClick={onDownload}>Download ZIP</Button> :
              null
          }
        </Navbar.Group>
      </Navbar>
      <ResizeSensor onResize={onResize}>
        <div className="canvas-container">
          <canvas id="canvas" ref={canvasRef} tabIndex={0}></canvas>
          {loaded ? null : <div className="spinner-container"><Spinner size={64} /></div>}
        </div>
      </ResizeSensor>
      <Overlay isOpen={ron} lazy={true} hasBackdrop={false}>
        <Ron {...props} Module={module} close={() => setRon(false)} />
      </Overlay>
    </div>
  );
}

function instantiateWasm(canvas: HTMLCanvasElement,
  binaries: Binaries,
  Module: any,
  onArchive: (archive: Uint8Array) => void,
  onPoster: (poster: Uint8Array) => void,
  props: AppProps) {
  return new Promise<void>((resolve, reject) => {
    try {
      Module.saveZip = (archive: Uint8Array) => {
        Module.FS.syncfs((err: any) => { });
        onArchive(archive);
      }
      Module.onPoster = onPoster;
      Module.canvas = canvas;
      Module.instantiateWasm = async (info: any, receiveInstance: any) => {
        const wasmModule = await WebAssembly.compile(binaries.wasm);
        const instance = await WebAssembly.instantiate(wasmModule, info);
        receiveInstance(instance, wasmModule);
      };

      Module.onRuntimeInitialized = () => {
        instantiateProps(Module, props, binaries).then((args) => {
          setTimeout(() => {
            Module.callMain(args);
            resolve();
          }, 16);
        }).catch(console.error);
      };

      const decoder = new TextDecoder();
      const moduleFn = new (Function as any)(["Module"], decoder.decode(binaries.wasmJs));
      moduleFn(Module);
    } catch (e) {
      reject(e);
    }
  });
}

function instantiateProps(Module: any, props: AppProps, binaries: Binaries): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    Module.FS.chdir("/idbfs");
    Module.FS.syncfs(true, (err: any) => {
      const root = Module.FS_cwd() + "/";

      try {
        Module.FS.lookupPath(root + worldFile);
      } catch (e) {
        // recreate FS
        Module.getPreloadedPackage = (name: any, size: any) => binaries.data.buffer;
        // eslint-disable-next-line
        eval(new TextDecoder().decode(binaries.dataJs));
        Module.FS.syncfs(() => { });
      }

      if (props.route === "gen" && props.gen !== null) {
        (window as any).m = Module;
        const enc = new TextEncoder();
        Module.FS.unlink(root + worldFile);
        Module.FS.createDataFile(root, worldFile, enc.encode(props.gen.worldIni), true, true, true);
        if (props.gen.palette !== "mirage") {
          Module.FS.unlink(root + palFile);
          const data = Module.FS.readFile(root + "_palette/" + props.gen.palette + ".pal");
          Module.FS.createDataFile(root, palFile, data, true, true, true);
        }
        resolve(["/I" + props.gen.size, "/G0"]);
      } else if (props.route === "zip" && props.zip !== null) {
        Module.FS.chdir(root + "thechain/mirage/");
        Module._clear_cwd();
        const bytes = props.zip;
        const buffer = Module._malloc(bytes.length);
        Module.HEAPU8.set(bytes, buffer);
        Module._zip_to_fs(buffer, bytes.length);
        Module._free(buffer);
        Module.FS.chdir(root);
        resolve([]);
      } else {
        resolve([]);
      }
    });
  });
}

function resizeCanvas(canvas: HTMLCanvasElement, innerWidth: number, innerHeight: number) {
  const [width, height] = getSizeWithAspectRatio(innerWidth, innerHeight, WIDTH / HEIGHT);

  canvas.style.position = "relative";
  canvas.style.top = (innerHeight / 2) + "px";
  canvas.style.left = (innerWidth / 2) + "px";
  canvas.style.marginTop = (-1) * (height / 2) + "px";
  canvas.style.marginLeft = (-1) * (width / 2) + "px";
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

function getSizeWithAspectRatio(width: number, height: number, targetAspect: number) {
  const screenAspect = width / height;
  if (screenAspect === targetAspect) {
    return [width, height];
  }
  const calculatedWidth = Math.round(height * targetAspect);
  if (calculatedWidth <= width) {
    return [calculatedWidth, height];
  }
  const calculatedHeight = Math.round(width / targetAspect);
  return [width, calculatedHeight];
}

function downloadUrl(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "world.zip";
  a.style.display = "none";
  document.body.appendChild(a);

  a.click();
  a.remove();
}
