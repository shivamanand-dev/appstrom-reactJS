import axios from "axios";
import {
  FETCH_ELAICHI_REQUEST,
  FETCH_ELAICHI_SUCCESS,
  FETCH_ELAICHI_FAILURE,
} from "./elaichiTypes";

const REACT_APP_ELAICHI_BASE_URL = process.env.REACT_APP_ELAICHI_BASE_URL;

export const getAllElaichi = () => {
  return (dispatch) => {
    dispatch(fetchElaichiRequest());
    axios
      .get(`${REACT_APP_ELAICHI_BASE_URL}/`)
      .then((res) => {
        const elaichi = res.data;
        dispatch(fetchElaichiSuccess(elaichi));
      })
      .catch((error) => {
        dispatch(fetchElaichiFailure(error.message));
      });
  };
};

export const fetchElaichiRequest = () => {
  return {
    type: FETCH_ELAICHI_REQUEST,
  };
};

export const fetchElaichiSuccess = (elaichi) => {
  return {
    type: FETCH_ELAICHI_SUCCESS,
    payload: elaichi,
  };
};

export const fetchElaichiFailure = (error) => {
  return {
    type: FETCH_ELAICHI_FAILURE,
    payload: error,
  };
};
