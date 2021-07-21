import React, { useState } from "react";
import { Landing } from "./landing";
import { SurWeb } from "./surweb";


export interface AppProps {
	route: string,

	gen: GenProps | null,
	openGen: (palette: string, worldIni: string, size: number) => void;

	openLastSession: () => void;

	getVmp: () => Uint8Array | undefined;
	setVmp: (vmp: Uint8Array) => void;
}

export interface GenProps {
	palette: string,
	worldIni: string,
	size: number,
}

export function AppRouter() {
	const [route, setRoute] = useState<string>("");
	const [gen, setGen] = useState<GenProps|null>(null);

	const props: AppProps = {
		route,
		gen,
		openGen: (palette: string, worldIni: string, size: number) => {
			setGen({ palette, worldIni, size});
			setRoute("gen");
		},
		openLastSession: () => {
			setRoute("lastSession");
		},
		setVmp: (vmp: Uint8Array) => {},
		getVmp: () => undefined,
	};

	if (route.length > 0) {
		return <SurWeb {...props} />
	} else {
		return <Landing {...props} />;
	}
}