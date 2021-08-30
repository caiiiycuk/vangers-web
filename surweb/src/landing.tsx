import {
	Alignment, AnchorButton, Button, Card, Collapse, Elevation, Intent, Navbar
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { Gen } from './gen';
import { Zip } from './zip';
import "./landing.css";
import { AppProps } from './router';

export function Landing(props: AppProps) {
	const [opened, setOpened] = useState<string>("");

	return <div className="landing-menu">
		<Navbar>
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>SurWeb</Navbar.Heading>
				<Navbar.Divider />
				<Navbar.Heading><a href="https://caiiiycuk.github.io/vangers-web/">vangers-web</a></Navbar.Heading>
			</Navbar.Group>
		</Navbar>
		<Card className="root-card" interactive={true} elevation={Elevation.TWO}>
			<div className="start-options">
				<div className="open-option">
					<AnchorButton minimal={true} intent={Intent.PRIMARY} onClick={() => props.openLastSession()}>Open SurWeb last session</AnchorButton>
				</div>
				<div className="open-or">
					OR
				</div>
				{
					opened !== "gen" ?
						<div className="open-option">
							<AnchorButton intent={Intent.PRIMARY} minimal={true} onClick={() => setOpened("zip")}>Restore from ZIP</AnchorButton>
						</div> :
						null
				}
				<Collapse isOpen={opened === "zip"}>
					<Zip {...props} />
				</Collapse>
				<div className="open-or">
					OR
				</div>
				{
					opened !== "gen" ?
						<div className="open-option">
							<AnchorButton intent={Intent.PRIMARY} minimal={true} onClick={() => setOpened("gen")}>Generate world</AnchorButton>
						</div> :
						null
				}
				<Collapse isOpen={opened === "gen"}>
					<Gen {...props} />
				</Collapse>
				<div className="open-or">
					ADVANCED
				</div>
				<Button minimal={true} intent={Intent.PRIMARY} onClick={clearFs}>CLEAR SURWEB FS</Button>
			</div>
			<div className="tutorials">
				<h1>Tutorials</h1>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/YzZesk81SnQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/UPOkIhhQa1Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
			</div>
		</Card>


	</div>;
}

function clearFs() {
	if (typeof indexedDB === "undefined") {
		alert("Unable to access indexedDB");
		return;
	}

	const request = indexedDB.deleteDatabase("/idbfs");
	request.onsuccess = () => {
		alert("Ok");
	};
	request.onerror = (ev) => {
		alert("Error occured, look logs for details");
		console.error(ev);
	}
}