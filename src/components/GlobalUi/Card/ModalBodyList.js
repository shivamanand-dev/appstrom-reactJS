import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const ModalBodyList = (props) => {
  return (
    <div>
      <Modal.Body>
        <div>
          <p className="m-0">Name: {props.name}</p>
          <p className="m-0">@{props.username}</p>
        </div>
      </Modal.Body>
    </div>
  );
};

export default ModalBodyList;
