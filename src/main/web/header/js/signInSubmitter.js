import client from "../../restclient/client";
import {reset, SubmissionError} from "redux-form";
import {hideSignInModal} from "../../header/js/actions/actions";

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
      // TODO handle server validation errors
      throw new SubmissionError({_error: 'Sign up failed!'});
    });
};
