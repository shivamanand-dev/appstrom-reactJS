import React from "react";
import axios from "axios";
import DaysButton from "../../ActivityTracker/DaysButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

const ActivityCard = (props) => {
  const REACT_APP_ACTIVITY_BASE_URL = process.env.REACT_APP_ACTIVITY_BASE_URL;

  let completed = props.activity.isActivityCompeted;

  const date = new Date(props.activity.date);

  let dateParsed = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  // Handle Delete
  const handleDelete = async () => {
    const id = props.id;
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

  // Handle Complete
  const handleComplete = () => {
    const id = props.id;
    let activityDays = props.activity.days;

    activityDays.forEach((e) => {
      return (e.isDone = true);
    });

    const completed = true;

    updateDaysHandle(id, activityDays, completed);
  };

  const updateDaysHandle = async (id, currentActivityDays, completed) => {
    // Storing array in object
    let updatedDays = {
      days: currentActivityDays,
      isActivityCompeted: completed,
    };

    props.setNavProgress(50);
    // Sending Request
    await props.updateActivity(id, updatedDays);
    // Getting Activity
    //
    props.setNavProgress(70);
    props.getAllActivity();
    props.setAlert("Congrats!! Activity Completed", "success");
    props.setNavProgress(100);
  };

  // UI
  return (
    <div className="my-3">
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <p className="mb-0">
            <span style={{ fontSize: "24px", textTransform: "capitalize" }}>
              {props.activity.name}
            </span>
            <span className="mx-3" style={{ fontSize: "14px", margin: "0" }}>
              {dateParsed}
            </span>
          </p>

          <div>
            {/* Complete */}
            <i
              style={{ cursor: "pointer", fontSize: "22px" }}
              className={`bi bi-check2-all mx-2 ${
                completed ? "text-primary" : " "
              }`}
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="Mark as Complete"
              onClick={handleComplete}
            ></i>

            {/* Delete */}
            <i
              style={{ cursor: "pointer", color: "red", fontSize: "22px" }}
              className="bi bi-trash"
              onClick={handleDelete}
            ></i>
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <p>{props.activity.description}</p>
          </div>

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
                  disabled={completed}
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
