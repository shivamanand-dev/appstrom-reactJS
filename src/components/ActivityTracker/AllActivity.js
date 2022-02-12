/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  getAllActivity,
  updateActivity,
  setNavProgress,
  setAlert,
} from "../../redux";
import { connect } from "react-redux";
import ActivityCard from "../GlobalUi/Card/ActivityCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";

const AllActivity = ({
  getAllActivity,
  getActivity,
  setNavProgress,
  setAlert,
  updateActivity,
}) => {
  // Get Request from redux
  // console.log(getAllActivity);
  useEffect(() => {
    setNavProgress(50);
    getAllActivity();
    setNavProgress(100);
  }, []);

  const [key, setKey] = useState("allActivity");

  // console.log(getActivity.activity);

  let completedActivity = [];
  let notCompletedActivity = [];

  getActivity.activity.forEach((e) => {
    return e.isActivityCompeted
      ? completedActivity.push(e)
      : notCompletedActivity.push(e);
  });

  // console.log(completedActivity);
  // console.log(notCompletedActivity);

  return (
    <>
      {getActivity.error ? (
        <p>{getActivity.error}</p>
      ) : (
        <>
          <div className="mt-5">
            {/* <ul className="nav nav-tabs">
              <li className="nav-item nav-link active">Not Completed</li>
              <li className="nav-item nav-link">Completed</li>
            </ul> */}

            <Tabs
              id="controlled-tab-example active"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="allActivity" title="All Activity">
                {/* CARD - Render All Activity*/}
                {notCompletedActivity.map((e) => {
                  return (
                    <ActivityCard
                      key={e._id}
                      activity={e}
                      id={e._id}
                      getAllActivity={getAllActivity}
                      setNavProgress={setNavProgress}
                      setAlert={setAlert}
                      updateActivity={updateActivity}
                    />
                  );
                })}
              </Tab>
              <Tab eventKey="completedActivity" title="Completed Activity">
                {/* CARD - Render All Activity*/}
                {completedActivity.map((e) => {
                  return (
                    <ActivityCard
                      key={e._id}
                      activity={e}
                      id={e._id}
                      getAllActivity={getAllActivity}
                      setNavProgress={setNavProgress}
                      setAlert={setAlert}
                      updateActivity={updateActivity}
                    />
                  );
                })}
              </Tab>
            </Tabs>
          </div>
          <div></div>
        </>
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
    updateActivity: (id, days) => dispatch(updateActivity(id, days)),
    setNavProgress: (progress) => dispatch(setNavProgress(progress)),
    setAlert: (message, type) => dispatch(setAlert(message, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllActivity);
