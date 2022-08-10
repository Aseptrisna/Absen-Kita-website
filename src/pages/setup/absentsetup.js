import React, { Component } from "react";
import { AbsentView } from "../view";
import NavbarComponent from "../../components/NavbarComponent";
export default class AbsentSetup extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <AbsentView />
      </div>
    );
  }
}
