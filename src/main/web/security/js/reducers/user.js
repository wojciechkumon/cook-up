import {LOGIN, LOGOUT, SERVER_LOGOUT} from "../actions/actions";
import client from "../../../restclient/client";

function user(state = {loggedIn: false, isAuthenticating: true}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
        email: action.email,
        id: action.id,
        isAuthenticating: false
      };
    case LOGOUT:
      return {loggedIn: false, isAuthenticating: false};
    case SERVER_LOGOUT:
      client({method: 'POST', path: '/api/logout'});
      return {loggedIn: false, isAuthenticating: false};
    default:
      return state;
  }
}

export default user;