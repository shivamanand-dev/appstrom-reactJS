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
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid className="container">
          <Navbar.Brand>AppStrom</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {/* Nav Links */}
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
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
              <>
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
              </>
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
