import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

const ModalFooterGlobal = (props) => {
  return (
    <div>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.button}>
          Close
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default ModalFooterGlobal;
