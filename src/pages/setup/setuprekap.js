import React, { Component } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { RekapAbsenView } from "../view";

class SetupRekap extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <RekapAbsenView />
      </div>
    );
  }
}

export default SetupRekap;
