import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {
  email,
  maxLength,
  minLength,
  passwordLengthWarn,
  validateFieldMatch
} from "../../util/js/validators";
import {emailNotTaken} from "./emailNotTakenValidator";
import {asyncValidationDisabledOnSubmit, FormError, renderField} from "../../util/js/forms";

const minLength4 = minLength(4);
const maxLength64 = maxLength(64);
const lengthWarn = passwordLengthWarn(4, 8);

class SignInForm extends Component {

  handleKeyDown = (e, handleSubmit) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    }
  };

  render() {
    const {handleSubmit, error} = this.props;
    return (
      <form onSubmit={handleSubmit}
            onKeyDown={(e) => {
              this.handleKeyDown(e, handleSubmit);
            }}>
        <div>
          <Field name="email" type="text"
                 component={renderField} label="Email"
                 validate={[email]}/>
          <Field name="password" type="password"
                 component={renderField} label="Password"
                 validate={[minLength4, maxLength64]}
                 warn={lengthWarn}/>
          <Field name="matchingPassword" type="password"
                 component={renderField} label="Confirm password"/>
          <FormError error={error}/>
        </div>
      </form>
    );
  }
}

SignInForm = reduxForm({
  form: 'sign-in-form',
  validate: validateFieldMatch('password', 'matchingPassword', 'Passwords must match'),
  asyncValidate: emailNotTaken,
  asyncBlurFields: ['email'],
  shouldAsyncValidate: asyncValidationDisabledOnSubmit
})(SignInForm);

export default SignInForm;
