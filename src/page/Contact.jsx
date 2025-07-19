import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <Container style={{ minHeight: "calc(100vh - 56px)", padding: "40px 0" }}>
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm border-0" style={{ borderRadius: "18px" }}>
            <Card.Body>
              <h2
                className="mb-4 text-center"
                style={{ fontWeight: 700, color: "#7c3aed" }}
              >
                Liên hệ với chúng tôi
              </h2>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control type="text" placeholder="Nhập họ tên" />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Nhập email" />
                </Form.Group>
                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Nhập nội dung liên hệ..."
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" size="lg">
                    Gửi liên hệ
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card
            className="shadow-sm border-0"
            style={{ borderRadius: "18px", marginTop: "24px" }}
          >
            <Card.Body>
              <h5 className="mb-3" style={{ fontWeight: 600 }}>
                Thông tin liên hệ
              </h5>
              <p>
                <FaEnvelope color="#7c3aed" /> Email:{" "}
                <a href="mailto:info@example.com">info@example.com</a>
              </p>
              <p>
                <FaPhoneAlt color="#7c3aed" /> Điện thoại:{" "}
                <a href="tel:0123456789">0123 456 789</a>
              </p>
              <p>
                <FaMapMarkerAlt color="#7c3aed" /> Địa chỉ: 123 Đường ABC, Quận
                XYZ, TP.HCM
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
