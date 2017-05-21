import React, {Component} from "react";
import PropTypes from "prop-types";
import reduxForm from "redux-form/es/reduxForm";
import Field from "redux-form/es/Field";
import "../style/SimilarIngredientsCheckbox.scss";

class SimilarIngredientsCheckbox extends Component {

  render() {
    return (
          <div className="SimilarIngredientsCheckbox">
            <Field name="similarIngredients" component="input" type="checkbox"
                   id="similarIngredientsCheckbox"/>
            <label htmlFor="similarIngredientsCheckbox"/>
            <p className="info-label">Use similar ingredients</p>
          </div>
    );
  }
}

SimilarIngredientsCheckbox.propTypes = {
  disabled: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'finder-checkbox',
  destroyOnUnmount: false
})(SimilarIngredientsCheckbox);