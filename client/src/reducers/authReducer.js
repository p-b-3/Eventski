import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  //reducer is equivalent to department, it takes in action and some existing data(state) and makes changes to data(state) and returns it to be centralzied in anotehr location
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //if "" return false, otherwise return user model

    default:
      return state;
  }
}
