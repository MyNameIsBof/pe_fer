import { MainAPI } from "../MainAPI";
import { useFormik } from "formik";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Component thêm mới Art Tool
export default function Add() {
  const baseURL = `${MainAPI}`; // Đường dẫn API backend
  const navigate = useNavigate(); // Dùng để chuyển trang sau khi thêm mới

  // Khởi tạo formik để xử lý form và validate
  const formik = useFormik({
    initialValues: {
      artName: "",
      image: "",
      glassSurface: false,
      price: 0,
      description: "",
      brand: "KingArt",
      limitedTimeDeal: 0,
    },
    // Hàm submit gửi dữ liệu lên API
    onSubmit: (values) => {
      fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          // Hiện thông báo thành công, sau đó chuyển về trang dashboard
          toast.success("Add Art Tool successfully!", {
            onClose: () => {
              navigate("/khang");
            },
            autoClose: 1500,
          });
          setTimeout(() => navigate("/khang"), 2000);
        });
    },
    // Validate các trường form bằng Yup
    validationSchema: Yup.object({
      artName: Yup.string()
        .required("Required.")
        .test(
          "is-more-than-one-letter",
          "Must be more than one word.",
          (value) => value && value.trim().split(/\s+/).length > 1
        )
        .matches(/^[a-z\s]+$/, "Must be lowercase."), //check regex
      image: Yup.string().required("Required.").url("Invalid url"),
      price: Yup.number()
        .required("Required.")
        .min(10, "Must be greater or equal to 10."),
      description: Yup.string().required("Required."),
      limitedTimeDeal: Yup.number()
        .required("Required.")
        .max(1, "Must be smaller or equal to 1"),
    }),
  });

  // Giao diện form nhập thông tin Art Tool
  return (
    <div
      className="Add__container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container fluid="lg">
        <Row className="justify-content-md-center">
          <Col md={12}>
            {/* Form sử dụng formik */}
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                {/* Nhập tên sản phẩm */}
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      size="lg"
                      style={{ fontSize: "18px" }}
                      type="text"
                      placeholder="name"
                      name="artName"
                      value={formik.values.artName}
                      onChange={formik.handleChange}
                    />
                    {/* Hiện lỗi nếu nhập sai */}
                    {formik.touched.artName && formik.errors.artName && (
                      <Alert variant="warning">{formik.errors.artName}</Alert>
                    )}
                  </Form.Group>
                </Col>
                {/* Chọn thương hiệu */}
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    <Form.Select
                      style={{ fontSize: "18px" }}
                      aria-label="Default select example"
                      name="brand"
                      value={formik.values.brand}
                      onChange={formik.handleChange}
                    >
                      <option value="KingArt">KingArt</option>
                      <option value="Color Splash">Color Splash</option>
                      <option value="Edding">Edding</option>
                      <option value="Arteza">Arteza</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                {/* Nhập link ảnh sản phẩm */}
                <Col md={12}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      size="lg"
                      style={{ fontSize: "18px" }}
                      type="text"
                      placeholder="image"
                      name="image"
                      value={formik.values.image}
                      onChange={formik.handleChange}
                    />
                    {/* Hiện lỗi nếu nhập sai */}
                    {formik.touched.image && formik.errors.image && (
                      <Alert variant="warning">{formik.errors.image}</Alert>
                    )}
                  </Form.Group>
                </Col>
                {/* Switch chọn có glass surface hay không */}
                <Form.Group>
                  <Form.Label>Glass Surface or Not ?</Form.Label>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label={
                      formik.values.glassSurface
                        ? "It is Glass Surface"
                        : "It is not Glass Surface"
                    }
                    name="glassSurface"
                    onChange={formik.handleChange}
                  />
                </Form.Group>
                {/* Nhập giá */}
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      size="lg"
                      style={{ fontSize: "18px" }}
                      type="number"
                      step={10}
                      placeholder="Price"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                    />
                    {/* Hiện lỗi nếu nhập sai */}
                    {formik.touched.price && formik.errors.price && (
                      <Alert variant="warning">{formik.errors.price}</Alert>
                    )}
                  </Form.Group>
                </Col>
                {/* Nhập deal giới hạn thời gian */}
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Limited Deal</Form.Label>
                    <Form.Control
                      size="lg"
                      style={{ fontSize: "18px" }}
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="Date Of Birth"
                      name="limitedTimeDeal"
                      value={formik.values.limitedTimeDeal}
                      onChange={formik.handleChange}
                    />
                    {/* Hiện lỗi nếu nhập sai */}
                    {formik.touched.limitedTimeDeal &&
                      formik.errors.limitedTimeDeal && (
                        <Alert variant="warning">
                          {formik.errors.limitedTimeDeal}
                        </Alert>
                      )}
                  </Form.Group>
                </Col>
                {/* Nhập mô tả sản phẩm */}
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      style={{ fontSize: "18px" }}
                      aria-label="Default select example"
                      as="textarea"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    ></Form.Control>
                  </Form.Group>
                  {/* Hiện lỗi nếu nhập sai */}
                  {formik.touched.description && formik.errors.description && (
                    <Alert variant="warning">{formik.errors.description}</Alert>
                  )}
                </Col>
                {/* Nút submit và quay lại dashboard */}
                <Form.Group style={{ marginTop: "20px" }}>
                  <Button variant="primary" type="submit" size="lg">
                    Submit
                  </Button>
                  <Link to={"/khang"} style={{ marginLeft: "10px" }}>
                    <Button variant="warning" type="button" size="lg">
                      Back to Dashboard
                    </Button>
                  </Link>
                </Form.Group>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
