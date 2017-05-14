import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import {renderTextArea} from "../../util/js/forms";
import {maxLength, required} from "../../util/js/validators";

const maxLength2048 = maxLength(2048);

class WizardFormThirdPage extends Component {

  render() {
    const {handleSubmit, pristine, previousPage, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cookingTime">Cooking description</label>
          <Field name="cookingDescription"
                 type="text"
                 component={renderTextArea}
                 validate={[required, maxLength2048]}
                 label="Description"
                 rows="20"
                 cols="100"/>
        </div>

        <div>
          <button type="button" className="previous" onClick={previousPage}>
            Previous
          </button>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'add-recipe-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(WizardFormThirdPage);