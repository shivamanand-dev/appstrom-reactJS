import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="d-flex bg-light flex-wrap justify-content-between align-items-center py-3 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          ></Link>
          <span className="text-muted">© 2021 Company, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <Link className="text-muted" to="/"></Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted" to="/"></Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted" to="/"></Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
