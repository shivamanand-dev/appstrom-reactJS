import { combineReducers } from "redux";
import userReducer from "./Users/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
