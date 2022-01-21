import {
  FETCH_ELAICHI_REQUEST,
  FETCH_ELAICHI_SUCCESS,
  FETCH_ELAICHI_FAILURE,
} from "./elaichiTypes";

const initialState = {
  loading: false,
  elaichi: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ELAICHI_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ELAICHI_SUCCESS:
      return {
        loading: false,
        elaichi: action.payload,
        error: "",
      };
    case FETCH_ELAICHI_FAILURE:
      return {
        loading: false,
        elaichi: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
