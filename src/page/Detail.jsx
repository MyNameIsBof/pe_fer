import { useCallback, useEffect, useState } from "react";
import { MainAPI } from "../MainAPI";
import {
  Button,
  Col,
  Container,
  Image,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

// Component quản lý danh sách ArtTools, có phân trang, xoá, sửa
export default function ArtTools() {
  // URL API và danh sách art tools
  const baseURL = `${MainAPI}`;
  const [API, setAPI] = useState([]);

  // Hàm lấy dữ liệu từ API, dùng useCallback để tránh tạo lại hàm khi baseURL không đổi
  const fetchAPI = useCallback(() => {
    fetch(baseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setAPI(data))
      .catch((error) => console.log(error));
  }, [baseURL]);

  // Gọi API khi component mount hoặc baseURL thay đổi
  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  // Hàm xoá art tool, xác nhận bằng window.confirm, sau đó gọi API DELETE và reload lại danh sách, hiện toast thông báo
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item ?"
    );
    if (confirmed) {
      fetch(`${baseURL}/${id}`, {
        method: "DELETE",
      }).then(() => {
        toast.success("Delete successfully!!", {
          position: "top-right",
          autoClose: 2000,
        });
        fetchAPI();
      });
    }
  };

  // ============ PAGINATION ============
  const numRowsPerPage = 5; // Số dòng mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [paginatedData, setPaginatedData] = useState([]); // Data cho trang hiện tại

  // Khi API hoặc trang hiện tại đổi, cập nhật dữ liệu trang hiện tại (sắp xếp giảm dần theo id)
  useEffect(() => {
    const sortedApi = [...API].sort((a, b) => b.id - a.id);
    const start = (currentPage - 1) * numRowsPerPage;
    const end = start + numRowsPerPage;
    setPaginatedData(sortedApi.slice(start, end));
  }, [API, currentPage]);

  // Tính tổng số trang
  const numPages = Math.ceil(API.length / numRowsPerPage);

  // Xây dựng các nút chuyển trang cho Pagination
  const paginationItems = [];
  const addEllipsis = (key) =>
    paginationItems.push(<Pagination.Ellipsis key={key} disabled />);

  // Nếu số trang <= 8 thì hiện hết, nếu nhiều thì hiện số, dấu ... và trang đầu/cuối
  if (numPages <= 8) {
    paginationItems.push(
      <Pagination.Prev
        key="prev"
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      />
    );
    for (let i = 1; i <= numPages; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    if (currentPage > 2) {
      paginationItems.push(
        <Pagination.Item key={1} onClick={() => setCurrentPage(1)}>
          1
        </Pagination.Item>
      );
      if (currentPage > 3) addEllipsis("ellipsis-prev");
    }
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(numPages, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    if (currentPage < numPages - 1) {
      if (currentPage < numPages - 2) addEllipsis("ellipsis-next");
      paginationItems.push(
        <Pagination.Item
          key={numPages}
          onClick={() => setCurrentPage(numPages)}
        >
          {numPages}
        </Pagination.Item>
      );
    }
  }
  // Nút Next cho phân trang
  paginationItems.push(
    <Pagination.Next
      key="next"
      onClick={() => setCurrentPage(Math.min(currentPage + 1, numPages))}
      disabled={currentPage === numPages}
    />
  );

  // Giao diện render
  return (
    <div className="dashboard">
      <Container fluid="lg">
        {/* Nút thêm mới Art Tool */}
        <Row className="justify-content-md-end">
          <Col md={12}>
            <Link to={"/add"}>
              <Button
                variant="primary"
                className="btn-main-style"
                style={{ width: "initial" }}
              >
                Add new Art Tools
              </Button>
            </Link>
          </Col>
        </Row>
        {/* Bảng danh sách Art Tool */}
        <Row
          className="justify-content-md-center"
          style={{ marginTop: "20px" }}
        >
          <Col md={12}>
            <Table striped bordered hover className="dashboard__table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Glass Surface</th>
                  <th>Brand</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Render từng dòng, gồm nút sửa, xoá, icon glassSurface */}
                {paginatedData.map((art) => (
                  <tr key={art.id}>
                    <td>{art.id}</td>
                    <td className="image">
                      <Link to={`/edit/${art.id}`}>
                        <Image src={art.image} rounded width={100} />
                      </Link>
                    </td>
                    <td>{art.artName}</td>
                    <td>{art.price}</td>
                    <td>
                      {/* Nếu có glassSurface thì hiện dấu tích xanh, không thì dấu X đỏ (Font Awesome) */}
                      {art.glassSurface ? (
                        <i
                          style={{ color: "green" }}
                          className="fa-solid fa-check"
                        ></i>
                      ) : (
                        <i
                          style={{ color: "tomato" }}
                          className="fa-solid fa-xmark"
                        ></i>
                      )}
                    </td>
                    <td>{art.brand}</td>
                    <td>
                      <div className="btn-wrapper">
                        {/* Nút sửa */}
                        <Link to={`/edit/${art.id}`}>
                          <Button
                            variant="primary"
                            className="btn-main-style edit"
                          >
                            <MdModeEdit />
                          </Button>
                        </Link>
                        {/* Nút xoá */}
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(art.id)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          {/* Phân trang */}
          <Pagination id="pagination">{paginationItems}</Pagination>
        </Row>
      </Container>
    </div>
  );
}
