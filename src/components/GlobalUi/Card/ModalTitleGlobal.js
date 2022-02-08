import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const ModalTitleGlobal = (props) => {
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{props.name}</Modal.Title>
      </Modal.Header>
    </div>
  );
};

export default ModalTitleGlobal;
