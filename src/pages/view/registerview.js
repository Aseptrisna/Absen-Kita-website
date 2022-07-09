/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import "../../css/LoginPage.css";
import { Navigate } from "react-router-dom";
import logo from "../../assets/hire.svg";
import AlertComponent from "../../components/AlertComponent"
import Service from "../../services/service"

export default class RegisterView extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      email: "",
      name: "",
      password: "",
      telp: "",
      address: "",
      role: "instansi"
    }
    this.Validasi = this.Validasi.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.OnRegister = this.OnRegister.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  Validasi() {
    if (this.state.email === "") {
      AlertComponent.Error("Email harus diisi!")
    } else if (this.state.name === "") {
      AlertComponent.Error("Nama harus diisi!")
    } else if (this.state.password === "") {
      AlertComponent.Error("Password harus diisi!")
    } else if (this.state.telp === "") {
      AlertComponent.Error("No. Telp harus diisi!")
    } else if (this.state.address === "") {
      AlertComponent.Error("Alamat harus diisi!")
    } else {
      // AlertComponent.Error("Fitur Belum Tersedia!!")
      this.OnRegister();
    }
  }

  OnRegister() {
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      telp: this.state.telp,
      address: this.state.address,
      role: this.state.role
    }
    Service.register(data).then((res) => {
      if (res.data.status) {
        AlertComponent.Succes(res.data.message)
        this.setState({ redirectToReferrer: true })
      } else {
        AlertComponent.Error(res.data.message)
      }
    }).catch((e) => {
      AlertComponent.Error(e.response.data.message);
    });
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
          <h3 className="login-title">ABSEN KITA REGISTER</h3>
          <input
            type="text"
            placeholder="Email"
            name="email"
            required
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Nama Instansi"
            name="name"
            required
            value={this.state.name}
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
          <input
            type="number"
            placeholder="No. Telp"
            name="telp"
            required
            value={this.state.telp}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Alamat"
            name="address"
            required
            value={this.state.address}
            onChange={this.handleInputChange}
          />
          <button type="submit" onClick={() => this.Validasi()}>
            Register
          </button>
          <a href="/">
            <button type="submit">
              Login
            </button>
          </a>
        </div>
      </div>
    );
  }
}
