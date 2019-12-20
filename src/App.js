// @flow
import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";

const Drawer = createDrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = createStackNavigator(
	{
		Login: { screen: Login },
		Drawer: { screen: Drawer },
	},
	{
		initialRouteName: "Login",
		headerMode: "none",
	}
);

export default () => (
		<App />
);
