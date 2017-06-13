import client from "../../restclient/client";
import {reset} from "redux-form/es/actions";
import SubmissionError from "redux-form/es/SubmissionError";
import {hideSignInModal} from "../../header/js/actions/actions";
import {mapErrorCodeToMessage} from "../../util/js/validators";

export const handleSubmit = (dispatch, history) => values => {
  const signInData = {
    email: values.email,
    password: values.password,
    matchingPassword: values.matchingPassword
  };

  return client({method: 'POST', path: '/api/register', entity: signInData})
    .then(response => {
      if (response.status.text === 'Created') {
        dispatch(hideSignInModal());
        dispatch(reset('sign-in-form'));
        history.push("/signInSuccess");
      } else {
        throw new SubmissionError({_error: 'Sign up failed!'});
      }
      return response;
    }).catch(response => {
      if (response.entity && response.entity.errors) {
        throw new SubmissionError(prepareErrors(response.entity.errors));
      } else {
        throw new SubmissionError({_error: 'Sign up failed!'});
      }
    });
};

function prepareErrors(errors) {
  const errorsObject = {};

  errors.forEach(error => {
    if (error.field) {
      errorsObject[error.field] = mapErrorCodeToMessage(error.code, error.defaultMessage);
    } else if (error.code === 'FieldMatch') {
      errorsObject.matchingPassword = 'Passwords must match';
    }
    errorsObject._error = 'Sign up failed!';
  });
  return errorsObject;
}