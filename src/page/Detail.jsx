import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainAPI } from "../MainAPI";
import { Button, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Detail() {
  const { id } = useParams();
  const baseURL = `${MainAPI}/${id}`;
  const [API, setAPI] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(baseURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setAPI(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAPI();
  }, [baseURL]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#f9f9f9",
        paddingTop: "32px",
      }}
    >
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="primary"
            style={{ fontWeight: "bold", marginBottom: "24px" }}
          >
            Back To Home Page
          </Button>
        </Link>
        <div
          style={{
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            borderRadius: "16px",
            background: "#fff",
            padding: "32px",
            minHeight: "350px",
            position: "relative",
          }}
        >
          {API.glassSurface && (
            <div className="ribbon ribbon-top-left">
              <span>Glass Surface</span>
            </div>
          )}
          <Row
            style={{
              width: "100%",
              minHeight: "300px",
              alignItems: "center",
            }}
          >
            <Col
              xs={12}
              md={5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "12px",
              }}
            >
              <Image
                src={API.image}
                alt={API.artName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "260px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.09)",
                }}
                fluid
              />
            </Col>
            <Col
              xs={12}
              md={7}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                padding: "12px 18px",
              }}
            >
              <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                {API.artName}
              </h2>
              <p style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Price:</span> {API.price}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Brand:</span> {API.brand}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                {API.description}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: "bold" }}>GlassSurface:</span>{" "}
                {API.glassSurface ? "Yes" : "No"}
              </p>
              <p style={{ marginBottom: "0px" }}>
                <span style={{ fontWeight: "bold" }}>Limited Time Deal:</span>{" "}
                {API.limitedTimeDeal > 0
                  ? `${API.limitedTimeDeal * 100}%`
                  : "There is no deal here"}
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
