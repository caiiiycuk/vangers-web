import {
	Button, Callout, FileInput, Spinner, Card, Icon
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { AppProps } from './router';
import { worldFile, palFile, vmpFile, vprFile } from "./config";

import "./ron.css";

declare function ron2vmp(ron_multi_png: Uint8Array, height_png: Uint8Array, material_hi_png: Uint8Array, material_lo_png: Uint8Array): Uint8Array;
declare function vmp2ron(ini: string, vmp: Uint8Array, vpr: Uint8Array, palette: Uint8Array): void;
declare function get_ron_multi_png(): Uint8Array;
declare function get_height_png(): Uint8Array;
declare function get_material_hi_png(): Uint8Array;
declare function get_material_lo_png(): Uint8Array;

export interface RonProps extends AppProps {
	Module: any;
	close: () => void;
}

export function Ron(props: RonProps) {
	const [ronFile, setRonFile] = useState<File | undefined>(undefined);
	const [heightFile, setHeightFile] = useState<File | undefined>(undefined);
	const [hiFile, setHiFile] = useState<File | undefined>(undefined);
	const [loFile, setLoFile] = useState<File | undefined>(undefined);
	const [busy, setBusy] = useState<boolean>(false);

	const [ronUrl, setRonUrl] = useState<string>("");
	const [heightUrl, setHeightUrl] = useState<string>("");
	const [hiUrl, setHiUrl] = useState<string>("");
	const [loUrl, setLoUrl] = useState<string>("");

	function onFileChange(e: any, setFn: (f: File | undefined) => void) {
		setFn(e.target.files[0]);
	}

	async function updateWorld() {
		if (!(ronFile && heightFile && hiFile && loFile)) {
			return;
		}

		setBusy(true);
		const ron = await readContents(ronFile);
		const height = await readContents(heightFile);
		const hi = await readContents(hiFile);
		const lo = await readContents(loFile);
		const vmp = ron2vmp(ron, height, hi, lo);

		const Module = props.Module;
		const FS = Module.FS;
		const root = FS.cwd() + "/";
		FS.unlink(root + vmpFile);
		FS.createDataFile(root, vmpFile, vmp, true, true, true);
		Module._reloadWorld();
		Module._updateZipArchive();
		setBusy(false);

		props.close();
	}

	async function exportWorld() {
		setBusy(true);
		setTimeout(() => {
			const Module = props.Module;
			const FS = Module.FS;

			Module._updateZipArchive();

			const root = FS.cwd() + "/";
			const ini = new TextDecoder().decode(FS.readFile(root + worldFile));
			const vmp = FS.readFile(root + vmpFile);
			const vpr = FS.readFile(root + vprFile);
			const pal = FS.readFile(root + palFile);

			vmp2ron(ini, vmp, vpr, pal);

			const ron = get_ron_multi_png();
			const height = get_height_png();
			const hi = get_material_hi_png();
			const lo = get_material_lo_png();

			if (ronUrl.length > 0) {
				URL.revokeObjectURL(ronUrl);
				URL.revokeObjectURL(heightUrl);
				URL.revokeObjectURL(hiUrl);
				URL.revokeObjectURL(loUrl);
			}

			setRonUrl(URL.createObjectURL(new Blob([ron], { type: "text" })));
			setHeightUrl(URL.createObjectURL(new Blob([height], { type: "image/png" })));
			setHiUrl(URL.createObjectURL(new Blob([hi], { type: "image/png" })));
			setLoUrl(URL.createObjectURL(new Blob([lo], { type: "image/png" })));

			console.log(ron, height, hi, lo);
			setBusy(false);
		}, 100);
	}

	return <Card>
		<div className="ron-container">
			<div>
				{busy ?
					<Spinner /> :
					<Callout>
						<h5>Export WROLD to RON</h5>
						<div className="open-inputs">
							{
								ronUrl.length > 0 ?
									<Button className="ron-download" onKeyDown={() => { }} minimal={true} onClick={() => downloadUrl(ronUrl, "world.ron")}>Download RON</Button> :
									null
							}
							{
								heightUrl.length > 0 ?
									<Button className="ron-download" onKeyDown={() => { }} minimal={true} onClick={() => downloadUrl(heightUrl, "height.png")}>Download height PNG</Button> :
									null
							}
							{
								hiUrl.length > 0 ?
									<Button className="ron-download" onKeyDown={() => { }} minimal={true} onClick={() => downloadUrl(hiUrl, "material_hi.png")}>Download material HI PNG</Button> :
									null
							}
							{
								loUrl.length > 0 ?
									<Button className="ron-download" onKeyDown={() => { }} minimal={true} onClick={() => downloadUrl(loUrl, "material_lo.png")}>Download material LO PNG</Button> :
									null
							}
							<Button onClick={exportWorld}>Export world</Button>
						</div>
					</Callout>
				}
			</div>
			<div>
				{busy ?
					<Spinner /> :
					<Callout>
						<h5>Update WORLD using RON</h5>
						<p>Provide files</p>
						<div className="open-inputs">
							<FileInput hasSelection={ronFile !== undefined} text={ronFile ? ronFile.name : "Select 'ron' File"}
								onInputCapture={(e) => onFileChange(e, setRonFile)} />
							<FileInput hasSelection={heightFile !== undefined} text={heightFile ? heightFile.name : "Select 'height' File"}
								onInputCapture={(e) => onFileChange(e, setHeightFile)} />
							<FileInput hasSelection={hiFile !== undefined} text={hiFile ? hiFile.name : "Select 'material_hi' File"}
								onInputCapture={(e) => onFileChange(e, setHiFile)} />
							<FileInput hasSelection={loFile !== undefined} text={loFile ? loFile.name : "Select 'material_lo' File"}
								onInputCapture={(e) => onFileChange(e, setLoFile)} />
							<Button disabled={!(ronFile && heightFile && hiFile && loFile)} onClick={updateWorld}>Update world</Button>
						</div>
					</Callout>
				}
			</div>
			<Icon className="ron-close" icon="cross" onClick={() => props.close()} />
		</div>
		<div className="ron-powered-by">Powered by <a rel="noreferrer" href="https://github.com/kvark/vange-rs/wiki/Resource-Converter" target="_blank">vanger-rs converter</a></div>
	</Card>
}

async function readContents(file: File) {
	const reader = new FileReader();

	return new Promise<Uint8Array>((resolve, reject) => {
		reader.addEventListener('load', (event) => {
			resolve(new Uint8Array(reader.result as ArrayBuffer));
		})
		reader.readAsArrayBuffer(file);
	})
}

function downloadUrl(url: string, name: string) {
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.style.display = "none";
	document.body.appendChild(a);

	a.click();
	a.remove();
}