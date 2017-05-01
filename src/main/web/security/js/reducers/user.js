import {LOGIN, LOGOUT} from "../actions/actions";

function user(state = {loggedIn: false}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
        email: action.email,
        id: action.id
      };
    case LOGOUT:
      return {loggedIn: false};
    default:
      return state;
  }
}

export default user;