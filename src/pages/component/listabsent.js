import { Button, Card, Col } from "react-bootstrap";

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
  //   console.log(list);
  return (
    <div>
      <Col md={4} xs={8} xl={6} className="rowA mb-4">
        <Card
          border="primary"
          className="shadow"
          style={{ width: "18rem", textAlign: "center" }}
        >
          <Card.Header>{data.nama}</Card.Header>
          <Card.Body>
            <Card.Title>
              {datatahun[bulanint]} {data.tahun}
            </Card.Title>
            <Card.Text>Jumlah Kehadiran: {data.jumlah}</Card.Text>
            <Button variant="primary">Detail</Button>
          </Card.Body>
        </Card>
        <br></br>
      </Col>
    </div>
  );
};
export default List_Absent;
