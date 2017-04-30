import {combineReducers} from "redux";
import {
  HIDE_LOGIN_MODAL,
  HIDE_SIGN_IN_MODAL,
  SHOW_LOGIN_MODAL,
  SHOW_SIGN_IN_MODAL
} from "../actions/actions";

function showSignInModal(state = false, action) {
  switch (action.type) {
    case SHOW_SIGN_IN_MODAL:
      return true;
    case HIDE_SIGN_IN_MODAL:
      return false;
    default:
      return state;
  }
}

function showLoginModal(state = false, action) {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return true;
    case HIDE_LOGIN_MODAL:
      return false;
    default:
      return state;
  }
}

const modals = combineReducers({
  showSignInModal,
  showLoginModal
});

export default modals;