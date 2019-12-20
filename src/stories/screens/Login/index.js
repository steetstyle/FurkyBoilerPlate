import * as React from "react";
import { Image, Platform, View, Text } from "react-native";
//import styles from "./styles";
export interface Props {
	loginForm: any,
	onLogin: Function,
}
export interface State {}
class Login extends React.Component<Props, State> {
	render() {
		return (
		<View>
			<Text>We maintain over 50,000 React components at Facebook, and we don’t plan to rewrite them all immediately. We understand that migrations take time. We will take the gradual migration path along with everyone in the React community.</Text>
		</View>
		);
	}
}

export default Login;
