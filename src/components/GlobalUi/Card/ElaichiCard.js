import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

const ElaichiCard = (props) => {
  const element = props.element;
  // Function to convert time
  const dateConvert = (time) => {
    const now = new Date();
    const date = new Date(time);

    const difference = now - date;

    const timeInMin = Math.round(difference / 60000);

    if (timeInMin < 60) {
      return timeInMin + " min";
    } else {
      const timeInHr = Math.round(timeInMin / 60);
      if (timeInHr < 24) {
        return timeInHr + " hr";
      } else {
        return Math.round(timeInHr / 24) + " days";
      }
    }
  };
  return (
    <div>
      <Card
        style={{
          padding: "10px",
          background: "transparent",
          border: "none"
        }}
        className="my-1"
      >
        <Card.Body style={{borderRadius: "5px"}} className="customShadow">
          <Card.Title>
            <span style={{ cursor: "pointer" }}>{element.name} - </span>
            <span style={{ fontSize: "14px", fontWeight: "400" }}>
              {dateConvert(element.time)} ago
            </span>
          </Card.Title>
          <div>
            <Card.Text>{element.elaichi}</Card.Text>
          </div>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ElaichiCard;
