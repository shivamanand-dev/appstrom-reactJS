import { combineReducers } from "redux";
import userReducer from "./Users/userReducer";
import progressReducer from "./Progress/progressReducer";
import alertReducer from "./Alert/alertReducer";

const rootReducer = combineReducers({
  user: userReducer,
  progress: progressReducer,
  alert: alertReducer,
});

export default rootReducer;
