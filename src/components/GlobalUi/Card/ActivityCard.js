import React from "react";
import { connect } from "react-redux";
import { getAllActivity } from "../../../redux";
import { setNavProgress } from "../../../redux";
import { setAlert } from "../../../redux";
import DaysButton from "../../ActivityTracker/DaysButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const ActivityCard = (props, { getAllActivity, setNavProgress, setAlert }) => {
  const REACT_APP_ACTIVITY_BASE_URL = process.env.REACT_APP_ACTIVITY_BASE_URL;
  //   console.log(props.activity.days);
  console.log(getAllActivity);
  const handleDelete = async (e) => {
    e.preventDefault();

    const id = props.id;
    console.log(id);

    // setNavProgress(30);

    await axios
      .delete(`${REACT_APP_ACTIVITY_BASE_URL}/deleteActivity/${id}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const resJson = res.data;
        console.log(resJson);
        setAlert(resJson.Success, "success");
        // getAllActivity();
      });

    // setNavProgress(50);

    // setNavProgress(70);
  };
  return (
    <div className="my-3">
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <p className="mb-0">{props.activity.description}</p>
          <div>
            <i style={{ cursor: "pointer" }} className="bi bi-pen mx-3"></i>
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
                <DaysButton key={e.dayNo} days={e} id={props.activity._id} />
              );
            })}
          </div>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alertState: state.alert,
    getActivity: state.activity,
    progress: state.progress.progress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllActivity: () => dispatch(getAllActivity()),
    setAlert: (message, type) => dispatch(setAlert(message, type)),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCard);
