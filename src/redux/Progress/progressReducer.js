import { SET_NAV_PROGRESS } from "./progressTypes";

const initialState = {
  progress: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
