import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../util/js/validators";
import {FormError, renderField} from "../../util/js/forms";

class LoginForm extends Component {

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
                 validate={[required]}/>
          <Field name="password" type="password"
                 component={renderField} label="Password"
                 validate={[required]}/>
          <FormError error={error}/>
        </div>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: 'login-form'
})(LoginForm);

export default LoginForm;
