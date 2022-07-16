import React, { Component } from "react";
import { DetailAbsentView} from "../view";
import NavbarComponent from "../../components/NavbarComponent";
export default class SetupDetailViewAbsent extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <DetailAbsentView />
      </div>
    );
  }
}
