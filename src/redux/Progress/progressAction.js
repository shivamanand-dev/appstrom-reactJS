import { SET_NAV_PROGRESS } from "./progressTypes";

export const setNavProgress = (progress = 10) => {
  return {
    type: SET_NAV_PROGRESS,
    payload: progress,
  };
};
