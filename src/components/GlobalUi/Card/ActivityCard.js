import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import DaysButton from "../../ActivityTracker/DaysButton";

const ActivityCard = (props) => {
  console.log(props.activity.days);
  return (
    <div>
      <Card>
        <Card.Header>{props.activity.description}</Card.Header>
        <Card.Body>
          <Card.Title>{props.activity.name}</Card.Title>
          {/* <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text> */}
          <div className="d-flex">
            {props.activity.days.map((e) => {
              return <DaysButton key={e.dayNo} days={e} />;
            })}
          </div>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ActivityCard;
