//action creator (returns an action)
import axios from "axios";
import { FETCH_USER } from "./types";

//when redux thunk sees we are returning a function then will call function and pass in the dispatch function, don't have to dispatch an action until api request has compelted
//return is implied if returns single expression with arrow funtion, so remove return
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data }); //dispatch sends action to all reducers
};

export const handleToken = token => async dispatch => {
  //send token to back end
  const res = await axios.post("/api/stripe", token); //back end responds with user with updated number of credits
  dispatch({ type: FETCH_USER, payload: res.data }); //get back some user model as function above
};

export const submitSurvey = values => async dispatch => {
  //receive values from form
  const res = await axios.post("api/surveys/", values); //send values object as body to route
  return { type: FETCH_USER, payload: res.data }; //since sending udpating user back from post route at api/surveys
};
