import {
	Button, Callout, HTMLSelect, NumericInput, TextArea
} from '@blueprintjs/core';
import React, { useState } from 'react';
import "./landing.css";
import { AppProps } from './router';

export function Gen(props: AppProps) {
	const [palette, setPalette] = useState<string>("mirage");
	const [size, setSize] = useState<number>(10);
	const [meshValue, setMeshValue] = useState<number>(50);
	const [amplitude, setAmplitude] = useState<number>(2);
	const [terainType, setTerainType] = useState<number>(1);
	const [worldIni, setWorldIni] = useState<string>(initialWorldIni);

	function openGen() {
		const ini = `[Global Parameters]
Map Power X=11
Map Power Y=${size}
GeoNet Power=6
Section Size Power=8
Minimal Square Power=4

${worldIni}

[Creation Parameters]
Build Scenario File=output.vsc
Mesh Value=${meshValue}
Noise Amplitude=${amplitude}
Default Terrain Type=${terainType}
`;

		props.openGen(palette, ini, size)
	}

	return <div>
		<div>
			<Callout>
				<h5>Generate World</h5>
				<p>Options</p>
				<div className="open-inputs">
					<div>
						<label className="open-left-label">Palette</label>
						<HTMLSelect minimal={false}
							options={["ark-a-znoy", "boozeena", "fostral", "glorx", "hmok", "knox", "necross", "threall", "weexow", "xplo", "mirage"]}
							onChange={(e) => setPalette(e.currentTarget.value)}
							value={palette} />
					</div>
					<div className="in-a-row">
						<label className="open-left-label">World size ({size}:{2 ** size})</label>
						<NumericInput className="short-input" min={10} max={14} value={size} onValueChange={setSize} />
					</div>
					<div className="in-a-row">
						<label className="open-left-label">Mesh Value ({meshValue})</label>
						<NumericInput className="short-input" min={1} max={200} value={meshValue} onValueChange={setMeshValue} />
					</div>
					<div className="in-a-row">
						<label className="open-left-label">Noise Amplitude ({amplitude})</label>
						<NumericInput className="short-input" min={1} max={10} value={amplitude} onValueChange={setAmplitude} />
					</div>
					<div className="in-a-row">
						<label className="open-left-label">Terain Type ({terainType})</label>
						<NumericInput className="short-input" min={0} max={7} value={terainType} onValueChange={setTerainType} />
					</div>
					<div>
						<Button onClick={openGen}>Generate World</Button>
					</div>
					<div>
						<label className="open-left-label">Additional params</label><br />
						<TextArea className="open-textarea" large={false} growVertically={true} value={worldIni} onChange={(e) => setWorldIni(e.target.value)} />
					</div>
				</div>
			</Callout>
		</div>
	</div>
}

const initialWorldIni = `[Storage]
Version=1.4
Compressed Format Using=0
File Name=output
Palette File=harmony.pal

[Rendering Parameters]
Shadow Offsets= 6 16 4 9 6 3 2 6
Height Shifts=  2 4 8 8 5 6 8 6
Begin Colors=   1 32 64 72 88 104 112 120
End Colors=    31 63 71 87 103 111 119 127

[Dynamic Palette]
Wave Terrain=0
Terrain Number=3
Terrains= 5 4 6
Speeds= 128 128 256
Amplitudes= 32 8 32
Red= 1 1 1
Green= 0 1 1
Blue= 0 0 0

[Lighting Cycle Dynamic Palette]
Wave Terrain=0
Terrain Number=3
Terrains= 5 4 6
Speeds= 128 128 256
Amplitudes= 32 8 32
Red= 1 1 1
Green= 0 1 1
Blue= 0 0 0
`;