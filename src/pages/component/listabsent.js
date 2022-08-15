import { Button, Card, Col, Table } from "react-bootstrap";

const List_Absent = ({ data, detail }) => {
  const datatahun = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const bulan = data.bulan.replace(/^0+/, "");
  const bulanint = parseInt(bulan) - 1;
  const presentase = (data.jumlah / 26) * 100;
  return (
    <>
      <Col md={4} xs={8} xl={4} className="rowA mb-4">
        <Card
          border="primary"
          className="shadow"
          style={{ width: "22rem", textAlign: "center" }}
        >
          <Card.Header>{data.nama}</Card.Header>
          <Card.Body>
            <Card.Title>
              {datatahun[bulanint]} {data.tahun}
            </Card.Title>
            {/* <Card.Text>Absen Pagi: </Card.Text>
            <Card.Text>Absen Siang: {data.absen_siang}</Card.Text>
            <Card.Text>Jumlah Kehadiran: {data.jumlah}</Card.Text> */}
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Pagi</th>
                  <th>Siang</th>
                  <th>Sore</th>
                  <th>Lembur</th>
                </tr>
              </thead>
              <tr>
                <td>{data.absen_pagi}</td>
                <td>{data.absen_siang}</td>
                <td>{data.absen_sore}</td>
                <td>{data.absen_lembur}</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>{data.jumlah}</td>
              </tr>
              <tr>
                <td>Presentase:</td>
                <td>{presentase.toFixed(2)} %</td>
              </tr>
            </Table>
            <Button
              variant="primary"
              onClick={() => {
                detail(data);
              }}
              href="/detail"
            >
              Detail
            </Button>
          </Card.Body>
        </Card>
        <br></br>
      </Col>
    </>
  );
};
export default List_Absent;
