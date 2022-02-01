import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const ProfileCard = (props) => {
  const userData = props.userData;

  const dateConvert = (time) => {
    const date = new Date(time);

    // const difference = now - date;

    // const timeInMin = Math.round(difference / 60000);

    return (
      date.getDate() +
      " " +
      date.toLocaleString("UTC", { month: "long" }) +
      ", " +
      date.getFullYear()
    );
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
            width: "500px",
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
                  >
                    Follow
                  </Button>
                </div>
              ) : (
                <>
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
                    >
                      Edit Profile
                    </Button>
                  </div>
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

              <button
                style={{ width: "110px" }}
                type="button"
                className="btn btn-secondary btn-sm"
              >
                0 tweets
              </button>

              {/* DISPLAYS TOTAL NO. OF FOLLOWERS */}

              <button
                style={{ width: "110px" }}
                type="button"
                className="btn btn-secondary btn-sm mx-3"
              >
                {userData.users.followers} 0 Followers
              </button>

              {/* DISPLAYS TOTAL NO. OF FOLLOWING */}

              <button
                style={{ width: "110px" }}
                type="button"
                className="btn btn-secondary btn-sm"
              >
                {userData.users.followers} 0 Following
              </button>
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

      <div
        style={{ height: "220px", position: "relative", zIndex: "-1" }}
      ></div>
    </>
  );
};

export default ProfileCard;
