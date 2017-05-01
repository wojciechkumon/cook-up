import client from "../../restclient/client";
import {reset, SubmissionError} from "redux-form";
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
        dispatch(hideLoginModal());
        dispatch(reset('login-form'));
        dispatch(login(entity.email, entity.id));
        const redirectLoc = url.parse(window.location.href, true).query.redirect;
        if (redirectLoc) {
          history.push(redirectLoc);
        }
      } else {
        throw new SubmissionError({_error: 'Login failed!'});
      }
    });
};
