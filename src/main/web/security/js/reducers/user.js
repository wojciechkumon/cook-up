import {LOGIN, LOGOUT, SERVER_LOGOUT} from "../actions/actions";
import client from "../../../restclient/client";

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
    case SERVER_LOGOUT:
      client({method: 'POST', path: '/api/logout'});
      return {loggedIn: false};
    default:
      return state;
  }
}

export default user;