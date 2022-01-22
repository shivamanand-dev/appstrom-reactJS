import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../redux";
import { setNavProgress } from "../../redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

const Profile = ({ fetchUsers, userData, setNavProgress }) => {
  useEffect(() => {
    setNavProgress(50);
    fetchUsers();
    setNavProgress(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                style={{ width: "100%", height: "fit-content" }}
              >
                {/* ------ PROFILE PHOTO ICON ------ */}
                <div
                  className="text-center displayNone"
                  style={{ width: "100%" }}
                >
                  <i
                    class="bi bi-person-fill"
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
                      <p style={{ fontSize: "30px", fontWeight: "500" }}>
                        {userData.users.name}
                      </p>
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
                          fontSize: "15px",
                        }}
                        variant="outline"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </div>

                  {/*       ----- ROW 2 -----      */}

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

                  {/*       ----- ROW 3 -----      */}
                  <div className="d-flex my-1 mt-4">
                    <p>@{userData.users.username}</p>
                    <i className="bi bi-geo-fill mx-5"></i> {userData.users.location}
                    <i className="bi bi-calendar3"></i> {userData.users.dateOfBirth}
                  </div>
                </div>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
