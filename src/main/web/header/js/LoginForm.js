import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import {required} from "../../util/js/validators";
import {FormError, renderField} from "../../util/js/forms";
import {onEnter} from "../../util/js/keyboard";

class LoginForm extends Component {

  render() {
    const {handleSubmit, error} = this.props;
    return (
      <form onSubmit={handleSubmit}
            onKeyDown={e => onEnter(e, handleSubmit)}>
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
