import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return location.pathname === "/login" || location.pathname === "/signup" ? (
    <></>
  ) : (
    <>
      <div
        style={{
          height: "50px",
          bottom: "0",
          width: "100%",
        }}
      ></div>
      <div>
        <footer className="bg-dark py-1 text-light">
          <div className="container d-flex flex-wrap justify-content-between align-items-center py-1 border-top">
            <div className="col-md-4 d-flex align-items-center">
              <Link
                to="/"
                className="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1"
              >
                Logo
              </Link>
              <span>© 2021 AppStrom</span>
            </div>

            <ul
              style={{ fontSize: "22px" }}
              className="nav col-md-4 justify-content-end list-unstyled d-flex"
            >
              <li className="ms-3 mx-3">
                <a
                  className="text-muted"
                  href="https://twitter.com/appstrom_app"
                >
                  <i style={{ color: "#1DA1F2" }} className="bi bi-twitter"></i>
                </a>
              </li>
              <li className="ms-3 mx-3">
                <a
                  className="text-muted"
                  href="https://www.instagram.com/appstrom.app/"
                >
                  <i style={instaGradient} className="bi bi-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

//   ---- INSTAGRAM ICON GRADIENT ----
const instaGradient = {
  background:
    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default Footer;
