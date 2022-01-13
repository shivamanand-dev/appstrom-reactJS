import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const DaysButton = (props) => {
  // Getting Activity from Store
  const activity = useSelector((state) => state.activity);

  // Handle on click
  const handleOnclick = async (e) => {
    e.preventDefault();

    props.setNavProgress(30);
    const id = props.id;

    // Find Index of Current Activity
    const currentActivityIndex = activity.activity.findIndex(
      (e) => e._id === id
    );

    // Store Current Activity in Var
    let currentActivityDays = activity.activity[currentActivityIndex].days;

    // Find Clicked Day
    const dayIndex = currentActivityDays.findIndex(
      (e) => e.dayNo === props.days.dayNo
    );

    // Change to true
    if (currentActivityDays[dayIndex].isDone === true) {
      currentActivityDays[dayIndex].isDone = false;
    } else {
      currentActivityDays[dayIndex].isDone = true;
    }

    props.setNavProgress(40);
    // Function to send PUT request
    updateDaysHandle(id, currentActivityDays);
  };

  // Function to send PUT request
  const updateDaysHandle = async (id, currentActivityDays) => {
    // Storing array in object
    let updatedDays = {
      days: currentActivityDays,
    };

    props.setNavProgress(50);
    // Sending Request
    await props.updateActivity(id, updatedDays);
    // Getting Activity
    //
    props.setNavProgress(70);
    props.getAllActivity();
    props.setAlert("Updated", "success");
    props.setNavProgress(100);
  };

  return (
    <div>
      <Button
        className="m-1"
        style={{ width: "45px" }}
        variant={`${props.days.isDone ? "success" : "outline-warning"}`}
        onClick={handleOnclick}
      >
        {props.days.dayNo}
      </Button>
    </div>
  );
};

export default DaysButton;
