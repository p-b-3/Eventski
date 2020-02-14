import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  //combineReducers sets keys for state object
  auth: authReducer
});
