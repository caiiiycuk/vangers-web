import {
	Button, Callout, FileInput, Spinner
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { AppProps } from './router';

declare function ron2vmp(ron_multi_png: Uint8Array, height_png: Uint8Array, material_hi_png: Uint8Array, material_lo_png: Uint8Array): Uint8Array;

export function Ron(props: AppProps) {
	const [ronFile, setRonFile] = useState<File | undefined>(undefined);
	const [heightFile, setHeightFile] = useState<File | undefined>(undefined);
	const [hiFile, setHiFile] = useState<File | undefined>(undefined);
	const [loFile, setLoFile] = useState<File | undefined>(undefined);
	const [busy, setBusy] = useState<boolean>(false);

	function onFileChange(e: any, setFn: (f: File | undefined) => void) {
		setFn(e.target.files[0]);
	}

	async function createWorld() {
		if (!(ronFile && heightFile && hiFile && loFile)) {
			return;
		}

		setBusy(true);
		const ron = await readContents(ronFile);
		const height = await readContents(heightFile);
		const hi = await readContents(hiFile);
		const lo = await readContents(loFile);
		props.setVmp(ron2vmp(ron, height, hi, lo));
		setBusy(false);
	}

	return <div>
			<div>
				{busy ?
					<Spinner /> :
					<Callout>
						<h5>Create map using RON</h5>
						<p>Card content</p>
						<div className="open-inputs">
							<FileInput hasSelection={ronFile !== undefined} text={ronFile ? ronFile.name : "Select 'ron' File"}
								onInputCapture={(e) => onFileChange(e, setRonFile)} />
							<FileInput hasSelection={heightFile !== undefined} text={heightFile ? heightFile.name : "Select 'height' File"}
								onInputCapture={(e) => onFileChange(e, setHeightFile)} />
							<FileInput hasSelection={hiFile !== undefined} text={hiFile ? hiFile.name : "Select 'material_hi' File"}
								onInputCapture={(e) => onFileChange(e, setHiFile)} />
							<FileInput hasSelection={loFile !== undefined} text={loFile ? loFile.name : "Select 'material_lo' File"}
								onInputCapture={(e) => onFileChange(e, setLoFile)} />
							<Button disabled={!(ronFile && heightFile && hiFile && loFile)} onClick={createWorld}>Create world</Button>
						</div>
					</Callout>
				}
			</div>
		</div>
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