import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  //combineReducers sets keys for state object
  auth: authReducer,
  form: reduxForm
});
