import * as Expo from "expo";
import * as React from "react";
import { Provider } from "mobx-react/native";

import App from "../App";
export interface Props {}
export interface State {
	isReady: boolean,
}
export default function(stores) {
	return class Setup extends React.Component<Props, State> {
		state: {
			isReady: boolean,
		};
		constructor() {
			super();
			this.state = {
				isReady: false,
			};
		}
		componentDidMount() {
			this.loadFonts();
		}
		async loadFonts() {
			this.setState({ isReady: true });
		}

		render() {
			if (!this.state.isReady) {
				return <Expo.AppLoading />;
			}
			return (
					<Provider {...stores}>
						<App />
					</Provider>
			);
		}
	};
}
