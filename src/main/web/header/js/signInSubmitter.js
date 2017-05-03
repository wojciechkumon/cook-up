import client from "../../restclient/client";
import {reset, SubmissionError} from "redux-form";
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
    }).catch(response => {
      if (response.entity.errors) {
        throw new SubmissionError(prepareErrors(response));
      } else {
        throw new SubmissionError({_error: 'Sign up failed!'});
      }
    });
};

function prepareErrors(response) {
  const errorsObject = {};

  response.entity.errors.forEach(error => {
    if (error.field) {
      errorsObject[error.field] = mapErrorCodeToMessage(error.code, error.defaultMessage);
    } else if (error.code === 'FieldMatch') {
      errorsObject.matchingPassword = 'Passwords must match';
    }
    errorsObject._error = 'Sign up failed!';
  });
  return errorsObject;
}