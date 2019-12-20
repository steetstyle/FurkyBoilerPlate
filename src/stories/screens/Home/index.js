import * as React from "react";
import { Image, Platform, View } from "react-native";

import styles from "./styles";
export interface Props {
  navigation: any;
  list: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
  render() {
    return (
    <View/>
    );
  }
}

export default Home;
