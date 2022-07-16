import { Button, Card, Col, Row,Table } from "react-bootstrap";
import { API_URL_SERVER } from "../../server/url";

const List_AbsentDetail = ({ data, detail }) => {
  return (
    <div>
      {/* <Row xs={1} md={2} className="g-4">
        <Col  md={4} xs={6} xl={4} className="rowA mb-4">
          <Card
            border="primary"
            className="shadow"
            style={{ width: "22rem", textAlign: "center" }}
          >
            <Card.Body>
              <Card.Img
                variant="top"
                src={API_URL_SERVER + data.gambar}
                style={{
                  width: "150px",
                  textAlign: "center",
                  marginTop: "10px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <Card.Title>{data.nama}</Card.Title>
              <Card.Text>{data.deskripsi}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                {data.tanggal} {data.jam}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <br /> */}
    </div>
  );
};
export default List_AbsentDetail;
