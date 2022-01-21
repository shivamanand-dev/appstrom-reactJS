import { React, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const MainNavbar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, [location]);
  // console.log(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={`${
          location.pathname === "/login" || location.pathname === "/signup"
            ? " "
            : "dark"
        }`}
        variant={`${
          location.pathname === "/login" || location.pathname === "/signup"
            ? "light"
            : "dark"
        }`}
        className="fixed-top"
      >
        <Container className="container">
          <Navbar.Brand style={{ fontSize: "25px", fontWeight: "500" }}>
            AppStrom
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {/* Nav Links */}
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{
                maxHeight: "100px",
                margin: "0 auto",
                fontWeight: "400",
                fontSize: "18px",
              }}
              navbarScroll
            >
              {!localStorage.getItem("token") ? (
                <>
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
                  <Link
                    to="/contactus"
                    className={`nav-link mx-1 ${
                      location.pathname === "/contactus" ? "active" : ""
                    }`}
                  >
                    Contact Us
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className={`nav-link mx-1 ${
                      location.pathname === "/profile" ? "active" : ""
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/about"
                    className={`nav-link mx-1 ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                  >
                    About
                  </Link>
                </>
              )}
            </Nav>
            {!localStorage.getItem("token") ? (
              location.pathname === "/login" ? (
                <Link
                  to="/signup"
                  className="btn btn-outline-primary mx-1"
                  style={{ boxShadow: "none" }}
                >
                  Sign up
                </Link>
              ) : location.pathname === "/signup" ? (
                <Link
                  to="/login"
                  className="btn btn-outline-primary mx-1"
                  style={{ boxShadow: "none" }}
                >
                  Log in
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary mx-1"
                    style={{ boxShadow: "none" }}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-outline-primary mx-1"
                    style={{ boxShadow: "none" }}
                  >
                    Sign up
                  </Link>
                </>
              )
            ) : (
              <Button
                variant="outline-danger"
                className="mx-1"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
