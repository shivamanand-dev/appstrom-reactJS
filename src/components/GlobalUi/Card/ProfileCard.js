import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const ProfileCard = (props) => {
  const userData = props.userData;
  const REACT_APP_AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL;

  let followLabel = "Follow";

  // Bootstrap Modal
  const [showFollowing, setShowFollowing] = useState(false);

  const handleCloseFollowing = () => setShowFollowing(false);
  const handleShowFollowing = () => setShowFollowing(true);
  const [showFollower, setShowFollower] = useState(false);

  const handleCloseFollower = () => setShowFollower(false);
  const handleShowFollower = () => setShowFollower(true);
  // Date conversion
  const dateConvert = (time) => {
    const date = new Date(time);
    return (
      date.getDate() +
      " " +
      date.toLocaleString("UTC", { month: "long" }) +
      ", " +
      date.getFullYear()
    );
  };

  // Follower Counts
  let followers = [];
  let following = [];

  if (userData.users.followers !== undefined) {
    followers = userData.users.followers;
    following = userData.users.following;
  }
  if (followers.includes(localStorage.getItem("username"))) {
    console.log(true);
    followLabel = "Unfollow";
  }
  // Handle Follow Request
  const handleFollowRequest = async (e) => {
    e.preventDefault();
    props.setNavProgress(30);

    const url = `${REACT_APP_AUTH_BASE_URL}/updateFollower`;
    // Data to send
    let data = {
      follower: userData.users.username,
    };
    props.setNavProgress(50);
    await axios
      .put(url, data, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const resData = res.data;
        // console.log(resData);
        if (resData.success === true) {
          props.setAlert(resData.message, resData.alertStatus);
        } else {
          props.setAlert(resData.message, "danger");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    props.fetchElaichi(0);
    props.setNavProgress(100);
    // console.log(REACT_APP_AUTH_BASE_URL);
  };
  return (
    <>
      <div
        className="gradientBackground"
        style={{ height: "320px", zIndex: "1" }}
      >
        {/* --------------------------  PROFILE MAIN SECTION ------------------------ */}
        <div
          className="align-items-center "
          style={{
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          {/* ------ PROFILE PHOTO ICON ------ */}
          {/* <div className="text-center displayNone" style={{ width: "100%" }}>
            <i className="bi bi-person-fill" style={{ fontSize: "200px" }}></i>
          </div> */}

          {/* ------ PROFILE DETAILS SECTION ----- */}

          <div
            style={{ width: "max-content", margin: "0 auto", padding: "10px" }}
          >
            {/*      ----- ROW 1 -----     */}
            <div className="d-flex align-items-baseline">
              {/* SHOWS NAME */}
              <div className="mx-3">
                <h2
                  className="m-0"
                  style={{ fontSize: "30px", fontWeight: "500" }}
                >
                  {userData.users.name}
                </h2>
              </div>

              {/* EDIT PROFILE BUTTON */}
              {userData.users.username !== localStorage.getItem("username") ? (
                <div>
                  <Button
                    className="p-1 mb-2"
                    style={{
                      width: "105px",
                      borderColor: "#B1B1B1",
                      color: "black",
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                    variant="outline"
                    onClick={handleFollowRequest}
                  >
                    {followLabel}
                  </Button>
                </div>
              ) : (
                <>
                  {/* <div>
                    <Button
                      className="p-1 mb-2"
                      style={{
                        width: "105px",
                        borderColor: "#B1B1B1",
                        color: "black",
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                      variant="outline"
                    >
                      Edit Profile
                    </Button>
                  </div> */}
                </>
              )}
            </div>

            {/* Follow Button */}

            {/*       ----- ROW 2 -----      */}

            <div>
              {/* SHOWS USERNAME */}
              <p
                style={{
                  position: "relative",
                  bottom: "10px",
                  fontSize: "16px",
                  color: "rgb(63 68 73)",
                }}
                className="mx-3"
              >
                @{userData.users.username}
              </p>
            </div>

            {/*       ----- ROW 3 -----      */}

            <div className="d-flex">
              {/* DISPLAYS TOTAL NO. OF TWEETS */}

              {/* <button
                style={{ width: "110px" }}
                type="button"
                className="btn btn-secondary btn-sm"
              >
                0 tweets
              </button> */}

              {/* DISPLAYS TOTAL NO. OF FOLLOWERS */}

              <Button
                style={{ width: "110px" }}
                className="btn btn-secondary btn-sm mx-3"
                onClick={handleShowFollower}
              >
                {followers.length} Followers
              </Button>

              {/* DISPLAYS TOTAL NO. OF FOLLOWING */}

              <Button
                style={{ width: "110px" }}
                className="btn btn-secondary btn-sm"
                onClick={handleShowFollowing}
              >
                {following.length} Following
              </Button>
            </div>

            {/*       ----- ROW 4 -----      */}
            <div className="d-flex my-1 mt-4">
              <span
                style={{ marginLeft: "20px", marginRight: "7px" }}
                // className="bi bi-geo-fill mr-1"
              >
                📍
              </span>
              {userData.users.location}
              <span style={{ marginLeft: "20px", marginRight: "7px" }}>🎂</span>
              {dateConvert(userData.users.dateOfBirth)}
            </div>
          </div>
        </div>
      </div>

      {/* Followers */}
      <Modal show={showFollower} onHide={handleCloseFollower}>
        <Modal.Header closeButton>
          <Modal.Title>Your Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {followers.map((e) => {
            return <p>{e}</p>;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFollower}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Following */}
      <Modal show={showFollowing} onHide={handleCloseFollowing}>
        <Modal.Header closeButton>
          <Modal.Title>You Followings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {following.map((e) => {
            return <p>{e}</p>;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFollowing}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        style={{ height: "220px", position: "relative", zIndex: "-1" }}
      ></div>
    </>
  );
};

export default ProfileCard;
