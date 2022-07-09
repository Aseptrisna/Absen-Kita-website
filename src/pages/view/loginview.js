/* eslint-disable no-implied-eval */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "../../css/LoginPage.css";
import { Navigate } from "react-router-dom";
import logo from "../../assets/hire.svg";
import AlertComponent from "../../components/AlertComponent";
import User from "../../LocalStorage/User"
import service from "../../services/service";

export default class LoginView extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false,
    };
    this.OnLogin = this.OnLogin.bind(this);
    this.Validasi = this.Validasi.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  Validasi() {
    if (this.state.email === "") {
      AlertComponent.Error("Email harus diisi!")
    } else if (this.state.password === "") {
      AlertComponent.Error("Password harus diisi!")
    } else {
      this.OnLogin()
    }
  }

  OnLogin() {
    var data = {
      email: this.state.email,
      password: this.state.password,
    };
    service.login(data).then((res) => {
        if (res.data.status) {
            AlertComponent.Succes(res.data.message);
            setInterval("window.location.reload()", 1000);
            User.SaveToken(res.data.token);
            this.setState({ redirectToReferrer: true });
        } else {
            AlertComponent.Error(res.data.message);
        }
    }).catch((e) => {
        AlertComponent.Error(e.response.data.message);
    })
  }
  render() {
    if (this.state.redirectToReferrer) {
      return <Navigate to={"/"} />;
    }
    return (
      <div className="login-container">
        <div className="left-login-container">
          <img className="logo" src={logo}></img>
        </div>
        <div className="right-login-container">
          <h3 className="login-title">ABSEN KITA LOGIN</h3>
          <input
            type="text"
            placeholder="Email"
            name="email"
            required
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button type="submit" onClick={(e) => this.Validasi()}>
            Login
          </button>
          {/* <a href="/register">
            <button type="submit" href="/register">
              Register
            </button>
          </a> */}
          {/* <a href="/forgotpassword">Forgot Password?</a> */}
        </div>
      </div>
    );
  }
}
