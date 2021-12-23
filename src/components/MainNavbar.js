import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Navbar, Container, Nav } from "react-bootstrap";

const MainNavbar = () => {
  let location = useLocation();
  useEffect(() => {}, [location]);
  // console.log(location.pathname);
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid className="container">
          <Navbar.Brand href="#">AppStorm</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {/* Nav Links */}
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link
                to="/"
                className={`nav-link mx-1 ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`nav-link mx-1 ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                About
              </Link>
            </Nav>
            <Link
              to="/login"
              className="btn btn-outline-primary mx-1"
              style={{ boxShadow: "none" }}
            >
              SignIn
            </Link>
            <Link
              to="/signup"
              className="btn btn-outline-primary mx-1"
              style={{ boxShadow: "none" }}
            >
              SignUp
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
