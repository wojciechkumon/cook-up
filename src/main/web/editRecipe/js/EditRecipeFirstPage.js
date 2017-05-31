import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import FieldArray from "redux-form/es/FieldArray";
import {renderError, renderField} from "../../util/js/forms";
import {isDoubleValidator, maxLength, required} from "../../util/js/validators";
import {validateIngredients} from "../../addRecipe/js/addRecipeValidators";
import {doubleNormalizer} from "../../util/js/formNormalizers";
import IngredientAutocomplete from "../../addRecipe/js/IngredientAutocomplete";
import {Button} from "react-bootstrap";
import SubstituteAutocomplete from "../../addRecipe/js/SubstituteAutocomplete";
import "../../addRecipe/style/WizardFormFirstPage.scss";
import FontAwesome from "react-fontawesome";

const maxLength64 = maxLength(64);

class EditRecipeFirstPage extends Component {

  render() {
    let {handleSubmit, chosenIngredients} = this.props;
    return (
      <form className="WizardFormFirstPage" onSubmit={handleSubmit}>
        <div className="basic-info">
          <label htmlFor="name">Recipe name</label>
          <Field name="name"
                 type="text"
                 component={renderField}
                 validate={[required, maxLength64]}
                 label="Recipe name"/>
          {chosenIngredients
           && <FieldArray name="ingredients"
                          component={renderIngredients}
                          chosenIngredients={chosenIngredients}/>}
          <div className="nav-buttons">
            <Button type="submit">Next</Button>
          </div>
        </div>
      </form>
    );
  }
}

const renderIngredients = ({chosenIngredients, fields, meta: {error, submitFailed}}) => (
  <div>
    {fields.map((ingredient, index) => {
      const chosenIngredient = chosenIngredients[index].ingredient;
      return (
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
            chosenIngredient={chosenIngredient}
          />
          <Field
            name={`${ingredient}.ingredient`}
            component={renderError}
          />
          <Field
            name={`${ingredient}.substitutes`}
            component={SubstituteAutocomplete}
            chosenSubstitutes={chosenIngredients[index].substitutes}
          />
          <Field
            name={`${ingredient}.substitutes`}
            component={renderError}
          />
          <div>
            <Field
              className="amount-field"
              name={`${ingredient}.amount`}
              type="text"
              component={renderField}
              validate={[required, isDoubleValidator]}
              normalize={doubleNormalizer}
              label="Amount"
            />
            <span className="amount-unit">
                {chosenIngredient
                 && ('Ingredient unit: ' + chosenIngredient.ingredientUnit)}
                </span>
          </div>
        </div>
      )
    })}

    <Button type="button" onClick={() => fields.push({})}>Add
      ingredient</Button>
    <div className="nav-buttons">
      {submitFailed && error && <span>{error}</span>}
      <Field name="ingredientsError" component={renderError}/>
    </div>
  </div>
);

EditRecipeFirstPage = reduxForm({
  form: 'edit-recipe-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateIngredients
})(EditRecipeFirstPage);

export default EditRecipeFirstPage;