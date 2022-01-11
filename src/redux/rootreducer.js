import { combineReducers } from "redux";
import userReducer from "./Users/userReducer";
import progressReducer from "./Progress/progressReducer";
import alertReducer from "./Alert/alertReducer";
import activityReducer from "./ActivityTracker/activityReducer";

const rootReducer = combineReducers({
  user: userReducer,
  progress: progressReducer,
  alert: alertReducer,
  activity: activityReducer,
});

export default rootReducer;
