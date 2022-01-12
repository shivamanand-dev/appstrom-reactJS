import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const DaysButton = (props) => {
  const handleOnclick = () => {
    console.log(props.id);
  };
  return (
    <div>
      <Button
        className="m-1"
        style={{ width: "45px" }}
        variant={`${props.days.isCompleted ? "success" : "outline-warning"}`}
        onClick={handleOnclick}
      >
        {props.days.dayNo}
      </Button>
    </div>
  );
};

export default DaysButton;
