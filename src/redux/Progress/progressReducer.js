import { SET_NAV_PROGRESS } from "./progressTypes";

const initialState = {
  progress: 0,
  lol: 9,
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
