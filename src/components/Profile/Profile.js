import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../redux";
import { setNavProgress } from "../../redux";
import { getPersonalElaichi } from "../../redux";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import ElaichiCard from "../GlobalUi/Card/ElaichiCard";

const Profile = ({
  fetchUsers,
  userData,
  setNavProgress,
  getPersonalElaichi,
}) => {
  useEffect(() => {
    setNavProgress(50);
    fetchUsers();
    setNavProgress(70);
    getPersonalElaichi();
    setNavProgress(100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!localStorage.getItem("token") ? (
        <div>
          <p>Log in First</p>
        </div>
      ) : (
        <>
          {userData.loadng ? (
            <p>Loading...</p>
          ) : userData.error ? (
            <p>{userData.error}</p>
          ) : (
            <div>
              {/* --------------------------  PROFILE MAIN SECTION ------------------------ */}
              <div
                className="d-flex justify-content-between align-items-center gradientBackground"
                style={{
                  width: "100%",
                  height: "400px",
                  zIndex:"10"
                }}
              >
                {/* ------ PROFILE PHOTO ICON ------ */}
                <div
                  className="text-center displayNone"
                  style={{ width: "100%" }}
                >
                  <i
                    className="bi bi-person-fill"
                    style={{ fontSize: "200px" }}
                  ></i>
                </div>

                {/* ------ PROFILE DETAILS SECTION ----- */}

                <div
                  style={{ width: "100%", margin: "0 auto", padding: "10px" }}
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
                    <div>
                      <Button
                        className="p-1 mb-2"
                        style={{
                          width: "105px",
                          borderColor: "#B1B1B1",
                          color: "black",
                          fontWeight: "500",
                          fontSize: "15px"
                        }}
                        variant="outline"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </div>

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
                    >📍</span>
                    {userData.users.location}
                    <span
                      style={{ marginLeft: "20px", marginRight: "7px" }}
                    >🎂</span>
                    {dateConvert(userData.users.dateOfBirth)}
                  </div>
                </div>
              </div>
              <div style={{ height: "300px" }}></div>
              <ElaichiCard />
              {/* <div>
                <p>Name: {userData.users.name}</p>
                <p>E-Mail: {userData.users.email}</p>
                <p>Username: {userData.users.username}</p>
                <p>Balance: {userData.users.openningBalance}</p>
                <p>Followers: {userData.users.followers}</p>
                <p>Following: {userData.users.following}</p>

                <Link to="/activity" className="btn btn-secondary">
                  Activity Tracker
                </Link>

                <Link to="/elaichi" className="btn btn-secondary">
                  Elaichi
                </Link>
              </div> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    progress: state.progress.progress,
    elaichi: state.elaichi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
    getPersonalElaichi: () => dispatch(getPersonalElaichi()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
