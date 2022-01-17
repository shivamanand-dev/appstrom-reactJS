import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./userTypes";

const REACT_APP_AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL;

// Redux-thunk async Function
export const fetchUsers = () => {
  return (dispatch) => {
    // take getState as argument for all states here
    // console.log(getState());
    // Set Loading true
    dispatch(fetchUsersRequest());
    axios
      .get(`${REACT_APP_AUTH_BASE_URL}/getuser`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
