import {
  FETCH_ACTIVITY_REQUEST,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAILURE,
} from "./activityTypes";

const initialState = {
  loading: false,
  activity: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ACTIVITY_SUCCESS:
      return {
        loading: false,
        activity: action.payload,
        error: "",
      };
    case FETCH_ACTIVITY_FAILURE:
      return {
        loading: false,
        activity: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
