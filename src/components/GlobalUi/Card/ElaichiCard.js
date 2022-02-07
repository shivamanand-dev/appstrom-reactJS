import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ElaichiCard = (props) => {
  const REACT_APP_ELAICHI_BASE_URL = process.env.REACT_APP_ELAICHI_BASE_URL;
  const element = props.element;

  const setAlert = props.setAlert;
  const setNavProgress = props.setNavProgress;

  // navigate
  const navigate = useNavigate();
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

  // handleVisitProfile
  const handleVisitProfile = () => {
    navigate("/profile", { state: { username: element.username } });
  };

  const handleDeleteElaichi = async () => {
    setNavProgress(10);

    await axios.delete(
      `${REACT_APP_ELAICHI_BASE_URL}/deleteelaichi/${element._id}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    setNavProgress(50);
    setAlert("Tweet Deleted", "danger");
    props.fetchElaichi();
    setNavProgress(100);
  };
  return (
    <div>
      <Card
        style={{
          padding: "10px",
          background: "transparent",
          border: "none",
        }}
        className="my-1"
      >
        <Card.Body style={{ borderRadius: "5px" }} className="customShadow">
          <Card.Title className="d-flex justify-content-between">
            <div>
              <span style={{ cursor: "pointer" }} onClick={handleVisitProfile}>
                {element.name} -{" "}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "400" }}>
                {dateConvert(element.time)} ago
              </span>
            </div>
            <div>
              {element.username === localStorage.getItem("username") ? (
                <>
                  <i
                    className="bi bi-trash"
                    onClick={handleDeleteElaichi}
                    style={{ color: "#f00" }}
                  ></i>
                </>
              ) : (
                <></>
              )}
            </div>
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
