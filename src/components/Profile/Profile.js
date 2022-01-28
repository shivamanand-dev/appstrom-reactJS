import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../redux";
import { setNavProgress } from "../../redux";
import { getPersonalElaichi } from "../../redux";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "react-bootstrap";
import ElaichiCardHandler from "../Elaichi/ElaichiCardHandler";
import ProfileCard from "../GlobalUi/Card/ProfileCard";

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

  const REACT_APP_ELAICHI_BASE_URL = process.env.REACT_APP_ELAICHI_BASE_URL;

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
            <div
            >
              <div><ProfileCard userData={userData} /></div>
              
              <div
                style={{
                  maxWidth: "550px",
                  minWidth: "300px",
                }}
              >
                <ElaichiCardHandler
                  url={`${REACT_APP_ELAICHI_BASE_URL}/profile`}
                />
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
