import { useEffect, useState } from "react";
import { MainAPI } from "../MainAPI";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAnimateOnScroll from "../hooks/useAnimateOnScroll";

export default function Home() {
  const [API, setAPI] = useState([]);
  const sectionRef = useAnimateOnScroll();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(MainAPI, {
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
  }, []);

  useEffect(() => {
    const currentElements = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    currentElements.forEach((element, index) => {
      if (element) {
        element.style.transitionDelay = `${index * 0.06}s`;
        observer.observe(element);
      }
    });

    return () => {
      currentElements.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [API, sectionRef]);

  return (
    <div>
      <Container style={{ padding: "40px 0" }}>
        <Row>
          {API.map((art, index) => {
            if (art.limitedTimeDeal !== 0) return null;
            return (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={art.id}
                className="d-flex align-items-stretch"
                style={{ marginBottom: "28px" }}
              >
                <Card
                  ref={(el) => (sectionRef.current[index] = el)}
                  className="element-to-animate shadow-sm border-0"
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    transition:
                      "transform 0.34s cubic-bezier(.21,1.01,.62,1.11), box-shadow 0.3s",
                  }}
                >
                  <Link
                    to={`/detail/${art.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "210px",
                        overflow: "hidden",
                        background: "#f9f9ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={art.image}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s",
                        }}
                        alt={art.artName}
                        className="card-img-hover"
                      />
                    </div>
                  </Link>
                  <Card.Body
                    className="d-flex flex-column justify-content-between"
                    style={{ padding: "1rem" }}
                  >
                    <Card.Title
                      className="mb-2"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#212529",
                      }}
                    >
                      {art.artName}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#7c3aed",
                        marginBottom: 5,
                      }}
                    >
                      {art.price} VND
                    </Card.Text>
                    <Card.Text
                      style={{
                        fontStyle: "italic",
                        color: art.glassSurface ? "#0ea5e9" : "#f43f5e",
                        fontWeight: "bold",
                        fontSize: "0.98rem",
                        marginBottom: 5,
                      }}
                    >
                      {art.glassSurface
                        ? "Kính cường lực"
                        : "Không kính cường lực"}
                    </Card.Text>
                    <Card.Text
                      style={{
                        fontSize: "0.95rem",
                        color: "#555",
                        marginBottom: 10,
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>Hãng:</span> {art.brand}
                    </Card.Text>
                    <Link to={`/detail/${art.id}`} className="mt-auto">
                      <Button
                        variant="primary"
                        className="w-100"
                        style={{ borderRadius: "8px" }}
                      >
                        Xem chi tiết
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <style>{`
        .card-img-hover:hover {
          transform: scale(1.08);
        }
        .element-to-animate.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .element-to-animate {
          opacity: 0;
          transform: translateY(40px);
        }
      `}</style>
    </div>
  );
}
