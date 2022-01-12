/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { getAllActivity, setNavProgress, setAlert } from "../../redux";
import { connect } from "react-redux";
import ActivityCard from "../GlobalUi/Card/ActivityCard";

const AllActivity = ({
  getAllActivity,
  getActivity,
  setNavProgress,
  setAlert,
}) => {
  // Get Request from redux
  // console.log(getAllActivity);
  useEffect(() => {
    setNavProgress(50);
    getAllActivity();
    setNavProgress(100);
  }, []);

  return (
    <>
      {getActivity.error ? (
        <p>{getActivity.error}</p>
      ) : (
        <div>
          {/* CARD - Render All Activity*/}
          {getActivity.activity.map((e) => {
            return (
              <ActivityCard
                key={e._id}
                activity={e}
                id={e._id}
                getAllActivity={getAllActivity}
                setNavProgress={setNavProgress}
                setAlert={setAlert}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    getActivity: state.activity,
    progress: state.progress.progress,
    alertState: state.alert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllActivity: () => dispatch(getAllActivity()),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
    setAlert: (message, type) => dispatch(setAlert(message, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllActivity);
