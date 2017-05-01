import client from "../../restclient/client";
import {reset} from "redux-form";

export const handleSubmit = dispatch => values => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const loginData = {
    username: values.email,
    password: values.password
  };

  return client({method: 'POST', path: '/api/login', entity: loginData, headers})
    .then(response => console.log(response))
    .then(() => dispatch(reset('login')));
};
