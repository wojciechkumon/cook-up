import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import {renderField} from "../../util/js/forms";
import {maxLength, required} from "../../util/js/validators";

const maxLength64 = maxLength(64);

class WizardFormFirstPage extends Component {

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Recipe name</label>
          <Field name="name"
                 type="text"
                 component={renderField}
                 validate={[required, maxLength64]}
                 label="Recipe name"/>
          <button type="submit">Next</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'add-recipe-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(WizardFormFirstPage);