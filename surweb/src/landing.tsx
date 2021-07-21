import {
	Alignment, AnchorButton, Card, Collapse, Elevation, Intent, Navbar
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { Gen } from './gen';
import "./landing.css";
import { Ron } from './ron';
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
		<Card interactive={true} elevation={Elevation.TWO}>
			<div className="start-options">
				<div className="open-option">
					<AnchorButton minimal={true} intent={Intent.PRIMARY} onClick={() => props.openLastSession() }>Open SurWeb last session</AnchorButton>
				</div>
				<div className="open-or">
					OR
				</div>
				{
					opened !== "gen" ?
						<div className="open-option">
							<AnchorButton minimal={true} onClick={() => setOpened("gen")}>Generate world</AnchorButton>
						</div> :
						null
				}
				<Collapse isOpen={opened === "gen"}>
					<Gen {...props} />
				</Collapse>
				<div className="open-or">
					OR
				</div>
				{
					opened !== "ron" ?
						<div className="open-option">
							<AnchorButton minimal={true} onClick={() => setOpened("ron")}>Create world with ron</AnchorButton>
						</div> :
						null
				}
				<Collapse isOpen={opened === "ron"}>
					<Ron {...props} />
				</Collapse>
			</div>
		</Card>
	</div>;
}
