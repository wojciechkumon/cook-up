import {reset} from "redux-form";

export const handleSubmit = dispatch => values => {
  console.log(values);
  dispatch(reset('login'))
};
