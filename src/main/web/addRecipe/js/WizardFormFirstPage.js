import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import FieldArray from "redux-form/es/FieldArray";
import {renderField} from "../../util/js/forms";
import {isDoubleValidator, maxLength, required} from "../../util/js/validators";
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
          name={`${ingredient}.amount`}
          type="text"
          component={renderField}
          validate={[isDoubleValidator]}
          normalize={doubleNormalizer}
          label="Amount"
        />
        <Field
          name={`${ingredient}.substitutes`}
          component={SubstituteAutocomplete}
        />
      </li>
    ))}
    <li>
      <Button type="button" onClick={() => fields.push({})}>Add ingredient</Button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
);

const renderSubstitutes = ({fields, meta: {error}}) => (
  <ul>
    {fields.map((substitute, index) => (
      <li key={index}>
        <Button
          type="button"
          title="Remove substitute"
          onClick={() => fields.remove(index)}>x</Button>
        <Field
          name={substitute}
          type="text"
          component={renderField}
          label={`Substitute #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
    <li>
      <Button type="button" onClick={() => fields.push()}>Add substitute</Button>
    </li>
  </ul>
);

export default reduxForm({
  form: 'add-recipe-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(WizardFormFirstPage);