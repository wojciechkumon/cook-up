import client from "../../restclient/client";
import {reset} from "redux-form/es/actions";
import SubmissionError from "redux-form/es/SubmissionError";
import url from "url";
import {hideLoginModal} from "../../header/js/actions/actions";
import {login, logout} from "../../security/js/actions/actions";

export const handleSubmit = (dispatch, history) => values => {
  dispatch(logout());

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const loginData = {
    username: values.email,
    password: values.password
  };

  return client({method: 'POST', path: '/api/login', entity: loginData, headers})
    .then(response => response.entity)
    .then(entity => {
      if (entity.success === "true") {
        dispatchSuccessLogin(dispatch, entity, history);
      } else {
        dispatch(logout());
        throw new SubmissionError({_error: 'Login failed!'});
      }
    });
};

export const setUserIfLoggedIn = dispatch => {
  return client({method: 'GET', path: '/api/loginSuccess'})
    .then(response => response.entity)
    .then(entity => {
      if (entity.success === "true") {
        dispatchSuccessLogin(dispatch, entity);
      } else {
        dispatch(logout());
      }
    }).catch(() => {
      dispatch(logout());
    });
};

const dispatchSuccessLogin = (dispatch, entity, history) => {
  dispatch(hideLoginModal());
  dispatch(reset('login-form'));
  dispatch(login(entity.email, entity.id));
  const redirectLoc = url.parse(window.location.href, true).query.redirect;
  if (history && redirectLoc) {
    history.push(redirectLoc);
  }
};