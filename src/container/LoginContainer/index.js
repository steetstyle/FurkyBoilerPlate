// @flow
import * as React from "react";
import { observer, inject } from "mobx-react/native";

import Login from "../../stories/screens/Login";

export interface Props {
  navigation: any;
  loginForm: any;
}
export interface State {}

@inject("loginForm")
@observer
class LoginContainer extends React.Component<Props, State> {
  emailInput: any;
  pwdinput: any;
  login() {
    this.props.loginForm.validateForm();
    if (this.props.loginForm.isValid) {
      this.props.loginForm.clearStore();
      this.props.navigation.navigate("Drawer");
    } else {
    /* Uyarı ver*/
    }
  }
  render() {
    const form = this.props.loginForm;
    const Fields = "";
    return (
      <Login
        navigation={this.props.navigation}
        onLogin={() => this.login()}
      />
    );
  }
}

export default LoginContainer;
