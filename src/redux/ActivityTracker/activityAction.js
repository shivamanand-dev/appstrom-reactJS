import {
  FETCH_ACTIVITY_REQUEST,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAILURE,
} from "./activityTypes";
import axios from "axios";
const REACT_APP_ACTIVITY_BASE_URL = process.env.REACT_APP_ACTIVITY_BASE_URL;

export const getAllActivity = () => {
  return (dispatch) => {
    dispatch(fetchActivityRequest());
    axios
      .get(`${REACT_APP_ACTIVITY_BASE_URL}/allActivity`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const activity = res.data;
        dispatch(fetchActivitySuccess(activity));
      })
      .catch((error) => {
        dispatch(fetchActivityFailure(error.message));
      });
  };
};

export const fetchActivityRequest = () => {
  return {
    type: FETCH_ACTIVITY_REQUEST,
  };
};

export const fetchActivitySuccess = (activity) => {
  return {
    type: FETCH_ACTIVITY_SUCCESS,
    payload: activity,
  };
};

export const fetchActivityFailure = (error) => {
  return {
    type: FETCH_ACTIVITY_FAILURE,
    payload: error,
  };
};
