import React, {Component} from "react";
import PropTypes from "prop-types";
import reduxForm from "redux-form/es/reduxForm";
import Field from "redux-form/es/Field";

class SimilarIngredientsCheckbox extends Component {

  render() {
    return (
      <Field name="similarIngredients" component="input" type="checkbox"/>
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