
import {
	Button, Callout, FileInput
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { AppProps } from "./router";

export function Zip(props: AppProps) {
	const [zipFile, setZipFile] = useState<File | undefined>(undefined);
	const [busy, setBusy] = useState<boolean>(false);
	function onFileChange(e: any) {
		setZipFile(e.target.files[0]);
	}

	async function restore() {
		if (zipFile === undefined || busy) {
			return;
		}

		setBusy(true);
		const zipContents = await readContents(zipFile);
		props.openZip(zipContents);
	}

	return <div>
		<Callout>
			<h5>Restore world from ZIP</h5>
			<p className="try-zip">Try (<a href="worlds/satadi.zip">satadi.zip</a>) OR (<a href="worlds/empty.zip">empty.zip</a>)</p>
			<div className="open-inputs">
				<FileInput hasSelection={zipFile !== undefined} text={zipFile ? zipFile.name : "Select 'zip' File"} 
					onChange={onFileChange}/>
				<Button disabled={!zipFile || busy} onClick={restore}>Restore</Button>
			</div>
		</Callout>
	</div>;
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