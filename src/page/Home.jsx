import React, { useEffect, useState } from "react";
import { MainAPI } from "../MainAPI";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Home() {
  const baseURL = MainAPI;
  const [API, setAPI] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(baseURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network Error");
        }

        const data = await response.json();
        setAPI(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAPI();
  }, [baseURL]);

  return (
    <div>
      <Container style={{ padding: "20px 0" }}>
        {/* Thêm g-4 để các card cách đều nhau */}
        <Row className="g-4">
          {API.map((art) => {
            if (art.limitedTimeDeal !== 0) return null;
            return (
              <Col xs={12} md={4} key={art.id}>
                <Card style={{ width: "100%", height: "100%" }}>
                  <Link
                    to={`/detail/${art.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Img
                      variant="top"
                      src={art.image || "holder.js/100px180"}
                      style={{
                        width: "100%", // ảnh full chiều rộng card
                        height: "250px", // chiều cao vừa phải
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{art.artName}</Card.Title>
                    <Card.Text>Price: {art.price}</Card.Text>
                    <Card.Text
                      style={{
                        fontStyle: "italic",
                        color: art.glassSurface ? "#1376f8" : "tomato",
                        fontWeight: "bold",
                      }}
                    >
                      {art.glassSurface
                        ? "this is a glassSurface"
                        : "this is not a GlassSurface"}
                    </Card.Text>
                    <Card.Text>Brand: {art.brand}</Card.Text>
                    <Link to={`/detail/${art.id}`}>
                      <Button variant="primary">View Detail</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
