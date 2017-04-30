import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../util/js/validators";
import {renderField} from "../../util/js/forms";

class LoginForm extends Component {

  render() {
    const {handleSubmit} = this.props;
    return (
      <form className="NewCommentForm" onSubmit={handleSubmit}>
        <div>
          <Field name="email" type="text"
                 component={renderField} label="Email"
                 validate={[required]}/>
          <Field name="password" type="password"
                 component={renderField} label="Password"
                 validate={[required]}/>
        </div>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;
