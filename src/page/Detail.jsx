import { Link, useParams } from "react-router-dom";
import { MainAPI } from "../MainAPI";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

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
            "Content-type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
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
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f4f7fd 0%, #e5e5e5 100%)",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <Container>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            variant="primary"
            className="btn-main-style"
            style={{
              marginBottom: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(124,58,237,.11)",
            }}
          >
            ← Back to Home
          </Button>
        </Link>
        <div
          style={{
            border: "none",
            borderRadius: "24px",
            background: "white",
            padding: "32px 24px",
            boxShadow: "0 4px 24px rgba(124,58,237,.06)",
            position: "relative",
            minHeight: "480px",
          }}
        >
          {API.glassSurface && (
            <div className="ribbon ribbon-top-left">
              <span>Glass Surface</span>
            </div>
          )}
          <Row style={{ height: "100%" }}>
            <Col
              xs={12}
              md={6}
              className="d-flex align-items-center justify-content-center"
              style={{ marginBottom: "16px", marginTop: "8px" }}
            >
              <Image
                src={API.image}
                style={{
                  maxWidth: "100%",
                  maxHeight: "360px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  boxShadow: "0 6px 18px rgba(60,60,90,.07)",
                  background: "#f9f9ff",
                }}
                alt={API.artName}
              />
            </Col>
            <Col
              xs={12}
              md={6}
              className="d-flex flex-column justify-content-center"
              style={{ padding: "8px 20px" }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  color: "#7c3aed",
                  marginBottom: "18px",
                }}
              >
                {API.artName}
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#4f46e5",
                  marginBottom: "12px",
                }}
              >
                Giá: <span style={{ color: "#e11d48" }}>{API.price}</span>
              </p>
              <p style={{ fontWeight: "500", marginBottom: "10px" }}>
                Hãng: <span style={{ color: "#3b82f6" }}>{API.brand}</span>
              </p>
              <p style={{ marginBottom: "10px", fontWeight: "500" }}>
                Mô tả:{" "}
                <span style={{ color: "#52525b" }}>{API.description}</span>
              </p>
              <p style={{ marginBottom: "10px", fontWeight: "500" }}>
                Ưu đãi giới hạn:{" "}
                {API.limitedTimeDeal > 0 ? (
                  <span style={{ color: "#16a34a", fontWeight: "bold" }}>
                    -{API.limitedTimeDeal * 100}%
                  </span>
                ) : (
                  <span style={{ color: "#b91c1c" }}>Không có ưu đãi</span>
                )}
              </p>
              <div style={{ marginTop: "24px" }}>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="outline-primary"
                    style={{ borderRadius: "8px" }}
                  >
                    Quay lại
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <style>{`
          .ribbon {
            width: 120px;
            height: 120px;
            overflow: hidden;
            position: absolute;
            top: -6px;
            left: -6px;
          }
          .ribbon span {
            position: absolute;
            display: block;
            width: 160px;
            padding: 8px 0;
            background-color: #7c3aed;
            color: #fff;
            font-weight: bold;
            font-size: 0.95rem;
            text-align: center;
            transform: rotate(-45deg);
            box-shadow: 0 2px 6px rgba(124,58,237,0.12);
            top: 24px;
            left: -38px;
            letter-spacing: 1px;
          }
        `}</style>
      </Container>
    </div>
  );
}
