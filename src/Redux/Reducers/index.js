import { combineReducers } from "redux";
import userReducer from "./userRedusers";

const rootReducer = combineReducers({
  userState: userReducer,
});

export default rootReducer;
