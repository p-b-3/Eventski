//action creator (returns an action)
import axios from "axios";
import { FETCH_USER } from "./types";

//when redux thunk sees we are returning a function then will call function and pass in the dispatch function, don't have to dispatch an action until api request has compelted
//return is implied if returns single expression with arrow funtion, so remove return
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data }); //dispatch action to all reducers
};
