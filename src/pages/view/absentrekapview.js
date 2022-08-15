/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { getGuid } from "../../helpers/jwt";
import service from "../../services/service";
import AlertComponent from "../../components/AlertComponent";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { API_URL_SERVER } from "../../server/url";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import ReactPaginate from "react-paginate";
export default class RekapAbsenView extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      units: [],
      bulan: "",
      unit: "",
      tahun: "",
      guid: "",
      nama: "",
      total: "",
      tanggalmulai: "",
      tanggalselesai: "",
      minggu: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidMount() {
    this.getData(1, 100);
    this.getUnits();
  }
  getData(page, limit) {
    this.setState({ guid: localStorage.getItem("guid") });
    this.setState({ nama: localStorage.getItem("nama") });
    const data = {
      page: page,
      limit: limit,
      guid: localStorage.getItem("guid"),
      bulan: this.state.bulan,
      tahun: this.state.tahun,
      tanggalmulai: this.state.tanggalmulai,
      tanggalselesai:this.state.tanggalselesai ,
      minggu: this.state.minggu ,
    };
    service
      .getAbentUser(data)
      .then((res) => {
        this.setState({ lists: res.data.data });
        this.setState({ pageCount: Math.ceil(res.data.totalPages) });
      })
      .catch((e) => {
        AlertComponent.Error(e.response.data.message);
      });
  }
  validate() {
    if(this.state.tahun===""){
      AlertComponent.Error("Tahun Tidak Boleh Kosong");
    }else if(this.state.bulan===""){
      AlertComponent.Error("Bulan Tidak Boleh Kosong");
    }else{
      this.getData(1,100);
    }
  }
  getUnits() {
    let data = {
      guid: getGuid(),
    };
    service
      .getUnits(data)
      .then((res) => {
        const units = res.data.data;
        this.setState({ units });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    let page = parseInt(selectedPage);
    let pageSelected = page + 1;
    this.getData(pageSelected, 10);
  };
  renderTable() {
    return this.state.lists.map((list, index) => {
      const {
        _id,
        nama,
        alamat,
        gambar,
        deskripsi,
        jam,
        tanggal,
        jenis,
        minggu
      } = list;
      // this.setState({ nama: nama });
      // this.setState({ total: index + 1 });
      return (
        <tr key={_id}>
          <td>{index + 1}</td>
          <td>{nama}</td>
          <td>{jenis}</td>
          {/* <td>{alamat}</td> */}
          <td>{tanggal}</td>
          <td>{jam}</td>
          <td>{minggu}</td>
          {/* <td>
            <img
              src={
                "https://absensi-selfie.pptik.id/data/kehadiran/image/" + gambar
              }
              className="sliderimg"
              alt=""
              width="100%"
              height="100%"
              class="shadow-lg p-2 mb-3 bg-white rounded"
            />
          </td> */}
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Form.Select
                aria-label="Default select example"
                className="form-control"
                value={this.state.tahun}
                onChange={this.handleInputChange}
                name="tahun"
              >
                <option value="">Pilih Tahun</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2021">2026</option>
                <option value="2022">2027</option>
                <option value="2023">2028</option>
                <option value="2024">2029</option>
                <option value="2025">2030</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                className="form-control"
                value={this.state.bulan}
                onChange={this.handleInputChange}
                name="bulan"
              >
                <option value="">Pilih Bulan</option>
                <option value="01">Januari</option>
                <option value="02">Februari</option>
                <option value="03">Maret</option>
                <option value="04">April</option>
                <option value="05">Mei</option>
                <option value="06">Juni</option>
                <option value="07">Juli</option>
                <option value="08">Agustus</option>
                <option value="09">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                className="form-control"
                value={this.state.minggu}
                onChange={this.handleInputChange}
                name="minggu"
              >
                <option value="">Pilih Minggu</option>
                <option value="">Semua</option>
                <option value="1">Minggu Ke 1</option>
                <option value="2">Minggu Ke 2</option>
                <option value="3">Minggu Ke 3</option>
                <option value="4">Minggu Ke 4</option>
              </Form.Select>
            </Col>
            {/* <Col>
              <Form.Control
                type="date"
                placeholder="Masukan tanggal Mulai"
                value={this.state.tanggalmulai}
                onChange={this.handleInputChange}
                name="tanggalmulai"
              />
            </Col>
            <Col>
              <Form.Control
                type="date"
                placeholder="Masukan tanggal Selesai"
                value={this.state.tanggalselesai}
                onChange={this.handleInputChange}
                name="tanggalselesai"
              />
            </Col> */}
            <Col>
              <Button variant="primary" onClick={(e) => this.validate()}>
                Tampilkan
              </Button>
            </Col>
          </Row>
        </Container>
        <Container>
          <Pagination>
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
          </Pagination>
        </Container>
        <Container>
          <ReactHTMLTableToExcel
            className="btn btn-info"
            table="emp"
            filename={this.state.nama + "-" + this.state.guid}
            sheet="Sheet"
            buttonText="Export excel"
          />
        </Container>
        <br />
        {/* <Container>
          <h6>Total Absen : {this.state.total}</h6>
        </Container>
        <br /> */}
        <Container>
          <table id="emp" class="table">
            <thead>
              <th>No</th>
              <th>Nama</th>
              <th>Jenis</th>
              {/* <th>Alamat</th> */}
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Minggu</th>
              {/* <th>Gambar</th> */}
            </thead>
            <tbody>{this.renderTable()}</tbody>
          </table>
        </Container>
      </div>
    );
  }
}
