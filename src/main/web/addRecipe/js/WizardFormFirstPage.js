import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import FieldArray from "redux-form/es/FieldArray";
import {renderError, renderField} from "../../util/js/forms";
import {isDoubleValidator, maxLength, required} from "../../util/js/validators";
import {validateIngredients} from "./addRecipeValidators";
import {doubleNormalizer} from "../../util/js/formNormalizers";
import IngredientAutocomplete from "./IngredientAutocomplete";
import {Button} from "react-bootstrap";
import SubstituteAutocomplete from "./SubstituteAutocomplete";
import "../style/WizardFormFirstPage.scss";
import FontAwesome from "react-fontawesome";

const maxLength64 = maxLength(64);

class WizardFormFirstPage extends Component {

  render() {
    const {handleSubmit} = this.props;
    return (
        <form className="WizardFormFirstPage" onSubmit={handleSubmit}>
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
    <div>
      {fields.map((ingredient, index) => (
          <div key={index}>

            <h4>
              <FontAwesome onClick={() => fields.remove(index)}
                           className="close-button"
                           name="times-circle"/>
              Ingredient #{index + 1}
            </h4>

            <Field
                name={`${ingredient}.ingredient`}
                component={IngredientAutocomplete}
            />
            <Field
                name={`${ingredient}.ingredient`}
                component={renderError}
            />
            <Field
                name={`${ingredient}.substitutes`}
                component={SubstituteAutocomplete}
            />
            <Field
                name={`${ingredient}.substitutes`}
                component={renderError}
            />
            <Field
                name={`${ingredient}.amount`}
                type="text"
                component={renderField}
                validate={[required, isDoubleValidator]}
                normalize={doubleNormalizer}
                label="Amount"
            />
          </div>
      ))}

        <Button type="button" onClick={() => fields.push({})}>Add
          ingredient</Button>
    <div className="nav-buttons">
    {submitFailed && error && <span>{error}</span>}
      <Field name="ingredientsError" component={renderError}/>
    </div>

    </div>
);

export default reduxForm({
  form: 'add-recipe-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateIngredients
})(WizardFormFirstPage);