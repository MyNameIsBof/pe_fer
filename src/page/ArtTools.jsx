// Import các thư viện và component cần thiết
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

// Component quản lý danh sách ArtTools
export default function ArtTools() {
  // Khai báo URL API và state lưu dữ liệu art tools
  const baseURL = `${MainAPI}`;
  const [API, setAPI] = useState([]);

  // Hàm lấy dữ liệu từ API, dùng useCallback để tránh tạo lại không cần thiết
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

  // Hàm xoá một art tool, gọi API method DELETE, xác nhận bằng confirm box
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item ?"
    );

    if (confirmed) {
      fetch(`${baseURL}/${id}`, {
        method: "DELETE",
      }).then(() => {
        // Hiện thông báo toast khi xoá thành công
        toast.success("Delete successfully!!", {
          position: "top-right",
          autoClose: 2000,
        });
        // Reload lại danh sách
        fetchAPI();
      });
    }
  };

  // ============ PHÂN TRANG ============
  const numRowsPerPage = 5; // Số dòng mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [paginatedData, setPaginatedData] = useState([]); // Data cho trang hiện tại

  // Cập nhật dữ liệu mỗi khi API hoặc trang thay đổi
  useEffect(() => {
    // Sắp xếp giảm dần theo id (mới lên đầu)
    const sortedApi = [...API].sort((a, b) => b.id - a.id);

    // Tính vị trí bắt đầu/kết thúc của trang
    const start = (currentPage - 1) * numRowsPerPage;
    const end = start + numRowsPerPage;
    setPaginatedData(sortedApi.slice(start, end));
  }, [API, currentPage]);

  // Tính tổng số trang
  const numPages = Math.ceil(API.length / numRowsPerPage);

  // Xây dựng các nút chuyển trang của Pagination
  const paginationItems = [];
  const addEllipsis = (key) =>
    paginationItems.push(<Pagination.Ellipsis key={key} disabled />);

  // Nếu số trang <= 8 thì hiện hết, ngược lại thì hiện có dấu ...
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
    // Nếu trang lớn thì hiện trang đầu, các trang gần trang hiện tại và trang cuối, có dấu ...
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

  // Các thành phần render UI
  return (
    <div className="dashboard">
      <Container fluid="lg">
        {/* Nút thêm mới */}
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
        {/* Bảng danh sách Art Tools */}
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
                {/* Render từng dòng theo paginatedData */}
                {paginatedData.map((art) => (
                  <tr key={art.id}>
                    <td>{art.id}</td>
                    <td className="image">
                      {/* Link tới trang sửa */}
                      <Link to={`/edit/${art.id}`}>
                        <Image src={art.image} rounded width={100} />
                      </Link>
                    </td>
                    <td>{art.artName}</td>
                    <td>{art.price}</td>
                    <td>
                      {/* Hiện icon xanh nếu có glassSurface, đỏ nếu không */}
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
                        {/* Nút edit */}
                        <Link to={`/edit/${art.id}`}>
                          <Button
                            variant="primary"
                            className="btn-main-style edit"
                          >
                            <MdModeEdit />
                          </Button>
                        </Link>
                        {/* Nút delete */}
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
