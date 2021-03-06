import React, { Component } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { Token } from "../../LocalStorage/getUser";
import { AppsView, LoginView } from "../view";
import { getRole } from "../../helpers/jwt";

export default class AppsSetup extends Component {
  render() {
    if (!Token) {
      return <LoginView />;
    } else {
      return (
        <>
          <NavbarComponent />
          <AppsView />
        </>
      );
    }
  }
}
