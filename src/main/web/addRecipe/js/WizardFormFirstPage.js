import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import FieldArray from "redux-form/es/FieldArray";
import {renderField} from "../../util/js/forms";
import {isDoubleValidator, maxLength, required} from "../../util/js/validators";
import {validateIngredients} from "./addRecipeValidators";
import {doubleNormalizer} from "../../util/js/formNormalizers";
import IngredientAutocomplete from "./IngredientAutocomplete";
import {Button} from "react-bootstrap";
import SubstituteAutocomplete from "./SubstituteAutocomplete";

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
          <FieldArray name="ingredients" component={renderIngredients}/>
          <Button type="submit">Next</Button>
        </div>
      </form>
    );
  }
}

const renderIngredients = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    {fields.map((ingredient, index) => (
      <li key={index}>
        <Button
          type="button"
          title="Remove ingredient"
          onClick={() => fields.remove(index)}>x</Button>
        <h4>Ingredient #{index + 1}</h4>
        <Field
          name={`${ingredient}.ingredient`}
          component={IngredientAutocomplete}
        />
        <Field
          name={`${ingredient}.substitutes`}
          component={SubstituteAutocomplete}
        />
        <Field
          name={`${ingredient}.amount`}
          type="text"
          component={renderField}
          validate={[isDoubleValidator]}
          normalize={doubleNormalizer}
          label="Amount"
        />
      </li>
    ))}
    <li>
      <Button type="button" onClick={() => fields.push({})}>Add ingredient</Button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
);

export default reduxForm({
  form: 'add-recipe-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateIngredients
})(WizardFormFirstPage);