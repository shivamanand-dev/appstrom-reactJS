import React, { useState } from "react";
import { getAllActivity, setNavProgress } from "../../redux";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const AddActivity = ({ getAllActivity, setNavProgress }) => {
  const REACT_APP_ACTIVITY_BASE_URL = process.env.REACT_APP_ACTIVITY_BASE_URL;
  // Null Activity for empty text box
  const nullActivity = {
    name: "",
    description: "",
    forDays: "",
    days: [],
  };

  //   State for input
  const [newActivity, setNewActivity] = useState(nullActivity);

  //   On Change handle
  const onchangeHandleInput = (e) => {
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  // Caclculate days
  const handleCalculateDays = (e) => {
    let days = [];
    for (let i = 0; i < (e.target.forDays = e.target.value); i++) {
      days.push({
        dayNo: i + 1,
        isDone: false,
      });
      setNewActivity({
        ...newActivity,
        [e.target.name]: e.target.value,
        days,
      });
    }
  };

  //   handleSubmitActivity
  const handleSubmitActivity = async (e) => {
    e.preventDefault();
    // console.log(newActivity);

    setNavProgress(50);
    // axios post request for new activity
    await axios.post(
      `${REACT_APP_ACTIVITY_BASE_URL}/addActivity`,
      newActivity,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    setNavProgress(70);
    getAllActivity();
    setNavProgress(100);

    // Setting text feild empty
    setNewActivity({
      name: "",
      description: "",
      forDays: "",
      days: [],
    });
  };
  return (
    <>
      <Form onSubmit={handleSubmitActivity}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label htmlFor="name">
              Name<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={newActivity.name}
              onChange={onchangeHandleInput}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label htmlFor="forDays">
              For Days<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="12"
              name="forDays"
              //   value={newActivity.forDays}
              onChange={handleCalculateDays}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            placeholder="Description"
            as="textarea"
            rows={3}
            name="description"
            value={newActivity.description}
            onChange={onchangeHandleInput}
          />
        </Form.Group>

        <Button
          variant="primary"
          disabled={newActivity.name.length < 3 || newActivity.forDays < 1}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    getActivity: state.activity,
    progress: state.progress.progress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllActivity: () => dispatch(getAllActivity()),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddActivity);
