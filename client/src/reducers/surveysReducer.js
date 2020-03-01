import { FETCH_SURVEYS } from "../actions/types";

export default function(state = [], action) {
  //reducer is equivalent to department, it takes in action and some existing data(state) and makes changes to data(state) and returns it to be centralzied in another location
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;

    default:
      return state;
  }
}
