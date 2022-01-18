import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../redux";
import { setNavProgress } from "../../redux";
import { Link } from "react-router-dom";

const Profile = ({ fetchUsers, userData, setNavProgress }) => {
  useEffect(() => {
    setNavProgress(50);
    fetchUsers();
    setNavProgress(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
            <>
              <h2>Profile Details:</h2>
              <div>
                <p>Name: {userData.users.name}</p>
                <p>E-Mail: {userData.users.email}</p>
                <p>Username: {userData.users.username}</p>
                <p>Balance: {userData.users.openningBalance}</p>
                <p>Followers: {userData.users.followers}</p>
                <p>Following: {userData.users.following}</p>

                <Link to="/activity" className="btn btn-secondary">
                  Activity Tracker
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
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
