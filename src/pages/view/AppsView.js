/* eslint-disable no-implied-eval */
import React, { Component } from 'react'
import { Tabs, Tab, Container, Modal, Button } from 'react-bootstrap'
import AlertComponent from '../../components/AlertComponent';
import service from '../../services/service';
import swal from "sweetalert";
import ReactPaginate from 'react-paginate';
import "../../css/home.css"
import { getGuid } from '../../helpers/jwt';

export default class AppsView extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            type: "",
            package_name: "",
            aplikasis: [],
            token: "",
            show: false,
            pageCount: "",
            perPage: 10

        }
        this.Validasi = this.Validasi.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.OnCreate = this.OnCreate.bind(this);
        this.Konfirmasi = this.Konfirmasi.bind(this);
        this.OnDelete = this.OnDelete.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    Validasi() {
        if (this.state.name === "") {
            AlertComponent.Error("Nama Unit harus diisi!")
        } else {
            this.OnCreate();
        }
    }

    OnCreate() {
        let data = {
            instansi:getGuid(),
            name: this.state.name,
            type: this.state.type,
            package_name: this.state.package_name
        }
        service.addApplication(data).then((res) => {
            if (res.data.status) {
                AlertComponent.Succes(res.data.message);
                setInterval("window.location.reload()", 1000);
            } else {
                AlertComponent.Error(res.data.message);
            }
        }).catch((e) => {
            AlertComponent.Error(e.response.data.message);
        });
    }

    getAplikasi(page, limit) {
        let data = {
            page: page,
            limit: limit,
            instansi:getGuid()
        }
        service.getApplication(data).then((res) => {
            if (res.data.status) {
                this.setState({ aplikasis: res.data.aplication })
                this.setState({ pageCount: Math.ceil(res.data.totalPages) })
            } else {
                AlertComponent.Error(res.data.message)
            }
        }).catch((e) => {
            AlertComponent.Error(e.response.data.message);
        });
    }

    componentDidMount() {
        this.getAplikasi(1, 10)
    }

    renderAppsData() {
        return this.state.aplikasis.map((app, index) => {
            const { _id, name} = app;
            return (
                <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>
                        {/* <button type='submit' onClick={() => this.showModal(app.acces_token)}>Token</button> */}
                        <button type='submit' onClick={() => this.Konfirmasi(app.guid)}>Hapus</button>
                    </td>
                </tr>
            )
        })
    }

    Konfirmasi(id) {
        swal({
            title: "Anda akan menghapus aplikasi ini dari sistem!",
            icon: "warning",
            dangerMode: true,
        }).then(yes => {
            if (yes) {
                this.OnDelete(id);
            }
        });
    }

    OnDelete(id) {
        service.deleteApplication(id).then((res) => {
            if (res.data.status) {
                AlertComponent.Succes(res.data.message);
                setInterval("window.location.reload()", 1000);
            } else {
                AlertComponent.Error(res.data.message);
            }
        }).catch((e) => {
            AlertComponent.Error(e.response.data.message);
        });
    }

    hideModal = () => {
        this.setState({ show: false });
        window.location.reload();
    };

    showModal(data) {
        this.setState({ show: true });
        this.setState({ token: data })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        // eslint-disable-next-line no-unused-vars
        const offset = selectedPage * this.state.perPage;
        let page = parseInt(selectedPage);
        let pageSelected = page + 1;
        this.getAplikasi(pageSelected, 10)
    }

    render() {
        return (
            <div>
                <Container>
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="home" title="Manajemen Units">
                            <table>
                                <thead>
                                    <th>No</th>
                                    <th>Nama Unit</th>
                                    {/* <th>Nama Package</th>
                                    <th>Type</th>
                                    <th>Guid</th>
                                    <th>Client ID</th>
                                    <th>Client Secret</th> */}
                                    {/* <th>Akses Token</th> */}
                                    <th>Aksi</th>
                                </thead>
                                <tbody>
                                    {this.renderAppsData()}
                                </tbody>
                            </table>
                            <ReactPaginate
                                className='pagination'
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={this.handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={this.state.pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                            />
                        </Tab>
                        <Tab eventKey="profile" title="Tambah Unit">
                            <div className="inside-tabs">
                                <div className="left-input">
                                    <input
                                        type="text"
                                        placeholder="Nama Unit"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                    {/* <select
                                        name='type'
                                        value={this.state.type}
                                        onChange={this.handleInputChange}
                                    >
                                        <option>Tipe Aplikasi</option>
                                        <option value='apps'>Apps</option>
                                        <option value='website'>Website</option>
                                        <option value='worker'>Worker</option>
                                        <option value='iot'>IOT</option>
                                    </select>
                                </div>
                                <div className='line'></div>
                                <div className="right-input">
                                    <input
                                        type="text"
                                        placeholder="Nama Package"
                                        name="package_name"
                                        value={this.state.package_name}
                                        onChange={this.handleInputChange}
                                    /> */}
                                    <button className='add-btn' type='submit' onClick={() => this.Validasi()}>Tambah Units</button>
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
                        <Modal.Title>Detail Akses Token</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Token</label>
                        <textarea
                            readOnly
                            type="text"
                            name="token"
                            placeholder="Email"
                            value={this.state.token}
                            onChange={this.handleInputChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.hideModal}>
                            Tutup
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
