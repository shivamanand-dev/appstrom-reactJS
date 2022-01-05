import { SET_ALERT_NULL, SET_ALERT_MESSAGE } from "./alertTypes";

const initialState = {
  message: "",
  type: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT_MESSAGE:
      return {
        message: action.payload.message,
        type: action.payload.type,
      };

    case SET_ALERT_NULL:
      return {
        message: "",
        type: "",
      };

    default:
      return state;
  }
};

export default reducer;
