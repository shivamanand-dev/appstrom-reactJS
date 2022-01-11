import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const DaysButton = (props) => {
  console.log(props);
  return (
    <div>
      <Button
        className="m-1"
        style={{ width: "45px" }}
        variant="outline-warning"
      >
        {props.days.dayNo}
      </Button>
    </div>
  );
};

export default DaysButton;
