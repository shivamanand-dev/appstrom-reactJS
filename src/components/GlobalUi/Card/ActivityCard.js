import React from "react";
import axios from "axios";
import DaysButton from "../../ActivityTracker/DaysButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

const ActivityCard = (props) => {
  const REACT_APP_ACTIVITY_BASE_URL = process.env.REACT_APP_ACTIVITY_BASE_URL;

  // Handle Delete
  const handleDelete = async (e) => {
    e.preventDefault();

    const id = props.id;
    console.log(id);

    // console.log();

    props.setNavProgress(30);

    await axios.delete(`${REACT_APP_ACTIVITY_BASE_URL}/deleteActivity/${id}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    props.setNavProgress(50);
    props.getAllActivity();
    props.setAlert("Activity Deleted", "success");
    props.setNavProgress(100);
  };
  return (
    <div className="my-3">
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <p className="mb-0">{props.activity.description}</p>
          <div>
            <i
              style={{ cursor: "pointer" }}
              className="bi bi-trash"
              onClick={handleDelete}
            ></i>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.activity.name}</Card.Title>

          {/* Render Days */}
          <div
            className="d-flex"
            style={{
              flexWrap: "wrap",
              margin: "0 auto",
              justifyContent: "center",
            }}
          >
            {props.activity.days.map((e) => {
              return (
                <DaysButton
                  key={e.dayNo}
                  days={e}
                  id={props.activity._id}
                  updateActivity={props.updateActivity}
                  getAllActivity={props.getAllActivity}
                  setNavProgress={props.setNavProgress}
                  setAlert={props.setAlert}
                />
              );
            })}
          </div>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ActivityCard;
