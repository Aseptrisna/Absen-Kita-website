/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import { getGuid } from "../../helpers/jwt";
import service from "../../services/service";
import AlertComponent from "../../components/AlertComponent";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import List_Absent from "../component/listabsent";
import ReactPaginate from "react-paginate";

export default class AbsentView extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      units: [],
      bulan: "",
      unit: "",
      tahun: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidMount() {
    this.getData(1, 10);
    this.getUnits();
  }
  getData(page, limit) {
    var data = {
      page: page,
      limit: limit,
      instansi: getGuid(),
      bulan: this.state.bulan,
      unit: this.state.unit,
      tahun: this.state.tahun,
    };
    service
      .getAbent(data)
      .then((res) => {
        this.setState({ lists: res.data.data });
        this.setState({ pageCount: Math.ceil(res.data.totalPages) });
      })
      .catch((e) => {
        AlertComponent.Error(e.response.data.message);
      });
  }
  detail(data) {
    console.log(data)
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
                <option value="">Pilih bulan</option>
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
                value={this.state.unit}
                onChange={this.handleInputChange}
                name="unit"
              >
                <option value="">Pilih Unit</option>
                {this.state.units.map((option) => (
                  <option value={option.guid}>{option.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Button variant="primary" onClick={(e) => this.getData(1, 10)}>
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

          <Col className="mt">
          <Row className="overflow-auto menu">
              {this.state.lists &&
                this.state.lists.map((data) => (
                  <List_Absent
                    key={data._id}
                    data={data}
                    detail={this.detail}
                  />
                ))}
            </Row>
          </Col>
        </Container>
        {/* <Container>
          <br />
          <Col>
            <Row className="overflow-auto menu">
              {this.state.lists &&
                this.state.lists.map((data) => (
                  <List_Absent
                    key={data._id}
                    data={data}
                    detail={this.detail}
                  />
                ))}
            </Row>
          </Col>
        </Container> */}
      </div>
    );
  }
}
