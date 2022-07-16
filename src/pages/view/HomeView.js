/* eslint-disable no-implied-eval */
import React, { Component } from "react";
import { Container, Tabs, Tab, Modal, Button } from "react-bootstrap";
import "../../css/home.css";
import AlertComponent from "../../components/AlertComponent";
import service from "../../services/service";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import { getGuid } from "../../helpers/jwt";

export default class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      password: "",
      telp: "",
      address: "",
      role: "user",
      users: [],
      show: false,
      emailEdit: "",
      nameEdit: "",
      telpEdit: "",
      addressEdit: "",
      pageCount: "",
      perPage: 10,
      unit: "",
      units: [],
    };
    this.Validasi = this.Validasi.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.OnRegister = this.OnRegister.bind(this);
    this.getUser = this.getUser.bind(this);
    this.Konfirmasi = this.Konfirmasi.bind(this);
    this.OnDelete = this.OnDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.ConfirmEdit = this.ConfirmEdit.bind(this);
    this.OnEdit = this.OnEdit.bind(this);
  }

  hideModal = () => {
    this.setState({ show: false });
    window.location.reload();
  };

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  Validasi() {
    if (this.state.email === "") {
      AlertComponent.Error("Email harus diisi!");
    } else if (this.state.name === "") {
      AlertComponent.Error("Nama harus diisi!");
    } else if (this.state.password === "") {
      AlertComponent.Error("Password harus diisi!");
    } else if (this.state.telp === "") {
      AlertComponent.Error("No. Telp harus diisi!");
    } else if (this.state.unit === "") {
      AlertComponent.Error("Unit harus diisi!");
    } else {
      this.OnRegister();
    }
  }

  OnRegister() {
    let data = {
      instansi: getGuid(),
      unit: this.state.unit,
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      telp: this.state.telp,
      address: this.state.address,
      role: this.state.role,
    };
    service
      .register(data)
      .then((res) => {
        if (res.data.status) {
          AlertComponent.Succes(res.data.message);
          setInterval("window.location.reload()", 1000);
        } else {
          AlertComponent.Error(res.data.message);
        }
      })
      .catch((e) => {
        AlertComponent.Error(e.response.data.message);
      });
  }

  getUser(page, limit) {
    let data = {
      page: page,
      limit: limit,
      instansi: getGuid(),
    };
    service
      .getUsers(data)
      .then((res) => {
        if (res.data.status) {
          this.setState({ users: res.data.user });
          this.setState({ pageCount: Math.ceil(res.data.totalPages) });
        } else {
          AlertComponent.Error(res.data.message);
        }
      })
      .catch((e) => {
        AlertComponent.Error(e.response.data.message);
      });
  }

  componentDidMount() {
    this.getUser(1, 10);
    this.getUnits();
  }
  getUnits() {
    let data = {
      guid: getGuid(),
    };
    service
      .getUnits(data)
      .then((res) => {
        const units = res.data.data;
        // console.log(units)
        this.setState({ units });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    // eslint-disable-next-line no-unused-vars
    const offset = selectedPage * this.state.perPage;
    let page = parseInt(selectedPage);
    let pageSelected = page + 1;
    this.getUser(pageSelected, 10);
  };

  renderTableUser() {
    return this.state.users.map((user, index) => {
      const { _id, name, email, telp } = user;
      return (
        <tr key={_id}>
          <td>{index + 1}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{telp}</td>
          {/* <td>{address}</td> */}
          <td>
            <button type="submit" onClick={() => this.showModal(user)}>
              Edit
            </button>
            <button type="submit" onClick={() => this.Konfirmasi(user.guid)}>
              Hapus
            </button>
          </td>
        </tr>
      );
    });
  }

  Konfirmasi(id) {
    swal({
      title: "Anda akan menghapus user ini dari sistem!",
      icon: "warning",
      dangerMode: true,
    }).then((yes) => {
      if (yes) {
        this.OnDelete(id);
      }
    });
  }

  OnDelete(id) {
    service
      .deleteUsers(id)
      .then((res) => {
        if (res.data.status) {
          AlertComponent.Succes(res.data.message);
          setInterval("window.location.reload()", 1000);
        } else {
          AlertComponent.Error(res.data.message);
        }
      })
      .catch((e) => {
        AlertComponent.Error(e.response.data.message);
      });
  }

  showModal(data) {
    this.setState({ show: true });
    localStorage.setItem("userEdit", JSON.stringify(data));
    this.setState({ emailEdit: data.email });
    this.setState({ nameEdit: data.name });
    this.setState({ telpEdit: data.telp });
    this.setState({ addressEdit: data.address });
  }

  ConfirmEdit() {
    let data = JSON.parse(localStorage.getItem("userEdit"));
    let id = data.guid;
    if (this.state.emailEdit === "") {
      AlertComponent.Error("Email harus diisi!");
    } else if (this.state.nameEdit === "") {
      AlertComponent.Error("Nama harus diisi!");
    } else if (this.state.telpEdit === "") {
      AlertComponent.Error("No. Telp harus diisi!");
    } else {
      this.OnEdit(id);
    }
  }

  OnEdit(id) {
    let data = {
      email: this.state.emailEdit,
      name: this.state.nameEdit,
      telp: this.state.telpEdit,
      address: this.state.addressEdit,
      role: this.state.role,
    };
    service
      .updateUsers(id, data)
      .then((res) => {
        if (res.data.status) {
          AlertComponent.Succes(res.data.message);
          setInterval("window.location.reload()", 1000);
        } else {
          AlertComponent.Error(res.data.message);
        }
      })
      .catch((e) => {
        AlertComponent.Error(e.response.data.message);
      });
  }

  render() {
    return (
      <div>
        <Container>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Manajemen User">
              <table>
                <thead>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Telp</th>
                  {/* <th>Alamat</th> */}
                  <th>Aksi</th>
                </thead>
                <tbody>{this.renderTableUser()}</tbody>
              </table>
              <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel=">"
                onPageChange={this.handlePageClick}
                pageRangeDisplayed={5}
                pageCount={this.state.pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
              />
            </Tab>
            <Tab eventKey="profile" title="Tambah User">
              <div className="inside-tabs">
                <div className="left-input">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Nama"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="line"></div>
                <div className="right-input">
                  <input
                    type="text"
                    placeholder="No. Telp"
                    name="telp"
                    value={this.state.telp}
                    onChange={this.handleInputChange}
                  />
                  {/* <input
                                        type="text"
                                        placeholder="Alamat"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.handleInputChange}
                                    /> */}
                  <select
                    className="form-control"
                    value={this.state.unit}
                    onChange={this.handleInputChange}
                    name="unit"
                  >
                    <option value="">Pilih Unit</option>
                    {this.state.units.map((option) => (
                      <option value={option.guid}>{option.name}</option>
                    ))}
                  </select>
                  <button
                    className="add-btn"
                    type="submit"
                    onClick={() => this.Validasi()}
                  >
                    Tambah User
                  </button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Container>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Email</label>
            <input
              type="text"
              name="emailEdit"
              placeholder="Email"
              value={this.state.emailEdit}
              onChange={this.handleInputChange}
            />
            <label>Nama</label>
            <input
              type="text"
              name="nameEdit"
              placeholder="Nama"
              value={this.state.nameEdit}
              onChange={this.handleInputChange}
            />
            <label>Telp</label>
            <input
              type="number"
              name="telpEdit"
              placeholder="No. Telp"
              value={this.state.telpEdit}
              onChange={this.handleInputChange}
            />
            {/* <label>Alamat</label>
            <input
              type="text"
              name="addressEdit"
              placeholder="Alamat"
              value={this.state.addressEdit}
              onChange={this.handleInputChange}
            /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.hideModal}>
              Cancel
            </Button>
            <Button variant="warning" onClick={(e) => this.ConfirmEdit()}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
