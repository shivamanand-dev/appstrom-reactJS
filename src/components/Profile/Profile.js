import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../redux";
import { setNavProgress } from "../../redux";
import { setAlert } from "../../redux";
import ElaichiCardHandler from "../Elaichi/ElaichiCardHandler";
import ProfileCard from "../GlobalUi/Card/ProfileCard";

const Profile = ({ fetchUsers, userData, setNavProgress, setAlert }) => {
  useEffect(() => {
    setNavProgress(50);
    fetchUsers();
    setNavProgress(70);
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
            <div>
              <div>
                <ProfileCard userData={userData} />
              </div>

              <div
                style={{
                  maxWidth: "550px",
                  minWidth: "300px",
                }}
              >
                <ElaichiCardHandler
                  url={`${REACT_APP_ELAICHI_BASE_URL}/profile`}
                  setAlert={setAlert}
                  setNavProgress={setNavProgress}
                />
              </div>
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
    alertState: state.alert,
    progress: state.progress.progress,
    elaichi: state.elaichi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    setAlert: (message, type) => dispatch(setAlert(message, type)),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
