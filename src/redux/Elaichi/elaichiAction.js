import {
  FETCH_ELAICHI_REQUEST,
  FETCH_ELAICHI_SUCCESS,
  FETCH_ELAICHI_FAILURE,
} from "./elaichiTypes";

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
