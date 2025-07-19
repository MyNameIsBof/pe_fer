import React, { useEffect, useState } from "react";
import { MainAPI } from "../MainAPI";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

// Component trang chủ hiển thị danh sách Art Tool
export default function Home() {
  const baseURL = MainAPI; // Đường dẫn API lấy danh sách art tools
  const [API, setAPI] = useState([]); // State lưu danh sách art tools

  // Lấy dữ liệu từ API khi component mount
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
          throw new Error("Network Error"); // Nếu lỗi mạng thì throw error
        }

        const data = await response.json();
        setAPI(data); // Lưu data vào state
      } catch (error) {
        console.log(error); // Log lỗi nếu có
      }
    };

    fetchAPI();
  }, [baseURL]);

  // Render UI
  return (
    <div>
      <Container style={{ padding: "20px 0" }}>
        {/* Row với class g-4 để khoảng cách giữa các card đều nhau */}
        <Row className="g-4">
          {/* Lặp qua từng art tool, chỉ hiển thị art.limitedTimeDeal === 0 */}
          {API.map((art) => {
            if (art.limitedTimeDeal !== 0) return null; // Nếu có deal thì ẩn
            return (
              <Col xs={12} md={4} key={art.id}>
                {/* Card hiển thị thông tin từng art tool */}
                <Card style={{ width: "100%", height: "100%" }}>
                  {/* Click vào ảnh sẽ tới trang chi tiết */}
                  <Link
                    to={`/detail/${art.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Img
                      variant="top"
                      src={art.image || "holder.js/100px180"}
                      style={{
                        width: "100%", // ảnh full chiều rộng card
                        height: "250px", // chiều cao cố định
                        objectFit: "cover", // ảnh không bị méo
                      }}
                    />
                  </Link>
                  <Card.Body>
                    {/* Tên sản phẩm */}
                    <Card.Title>{art.artName}</Card.Title>
                    {/* Giá */}
                    <Card.Text>Price: {art.price}</Card.Text>
                    {/* Trạng thái glassSurface, màu xanh hoặc đỏ */}
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
                    {/* Thương hiệu */}
                    <Card.Text>Brand: {art.brand}</Card.Text>
                    {/* Nút xem chi tiết */}
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
