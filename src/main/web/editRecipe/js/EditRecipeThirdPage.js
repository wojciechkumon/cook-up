import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import {renderTextArea} from "../../util/js/forms";
import {maxLength, required} from "../../util/js/validators";
import {Button} from "react-bootstrap";
import "../../addRecipe/style/WizardFormThirdPage.scss";

const maxLength2048 = maxLength(2048);

class EditRecipeThirdPage extends Component {

  render() {
    const {handleSubmit, previousPage, submitting} = this.props;
    return (
      <form className="WizardFormThirdPage" onSubmit={handleSubmit}>
        <div className="cookingDescription">
          <label htmlFor="cookingTime">Cooking description</label>
          <Field name="cookingDescription"
                 type="text"
                 component={renderTextArea}
                 validate={[required, maxLength2048]}
                 label="Description"
                 rows="20"
                 cols="100"/>
        </div>

        <div className="nav-buttons">
          <Button type="button" className="previous" onClick={previousPage}>
            Previous
          </Button>
          <Button type="submit" disabled={submitting}>Submit</Button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'edit-recipe-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(EditRecipeThirdPage);