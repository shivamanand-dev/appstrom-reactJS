import { SET_ALERT_NULL, SET_ALERT_MESSAGE } from "./alertTypes";

export const setAlert = (message, type) => {
  return (dispatch) => {
    const alertMessage = { message: message, type: type };
    dispatch(setAlertMessage(alertMessage));
    setTimeout(() => {
      dispatch(setAlertNull());
    }, 3000);
  };
};

export const setAlertMessage = (alertMessage) => {
  return {
    type: SET_ALERT_MESSAGE,
    payload: alertMessage,
  };
};

export const setAlertNull = () => {
  return {
    type: SET_ALERT_NULL,
  };
};
