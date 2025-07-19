import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{ cssText: "background-color: #1376f8 !important;" }}
    >
      <Container fluid>
        <Navbar.Brand>
          <Link
            to="/"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Art tools
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to="/"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/art-tools"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Art Tools
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/contact"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Contact
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
