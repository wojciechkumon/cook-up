import client from "../../restclient/client";
import {isCorrectEmail} from "../../util/js/validators";

export const emailNotTaken = values => {
  const {email} = values;
  if (!isCorrectEmail(email)) {
    return;
  }

  const entity = {
    email
  };
  return client({method: 'POST', path: '/api/emailNotTaken', entity})
    .catch(() => {
      throw {email: 'Email is taken'};
    });
};