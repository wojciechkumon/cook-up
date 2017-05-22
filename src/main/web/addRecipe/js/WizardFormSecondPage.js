import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import {renderError, renderField} from "../../util/js/forms";
import {isIntegerValidator, lessThen} from "../../util/js/validators";
import {integerNormalizer} from "../../util/js/formNormalizers";
import {validateDifficultyLevel} from "./addRecipeValidators";
import {Button} from "react-bootstrap";
import "../style/WizardFormSecondPage.scss";

const lessThenInt = lessThen(Math.pow(2, 31) - 1);

class WizardFormSecondPage extends Component {

  render() {
    const {handleSubmit, previousPage} = this.props;
    return (
        <form className="WizardFormSecondPage" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cookingTimeMinutes">Cooking time (minutes)</label>
            <Field name="cookingTimeMinutes"
                   type="text"
                   component={renderField}
                   validate={[isIntegerValidator, lessThenInt]}
                   normalize={integerNormalizer}
                   label="Cooking time"/>
          </div>
          <div className="difficulty-level">
            <label>Difficulty level</label>

            <ul>
              <li className="difficulty-radio-wrapper">
                <Field name="difficultyLevel" component="input" type="radio"
                       value="EASY" id="easy-option"/>
                {' '}
                <label htmlFor="easy-option">Easy</label>
                <div className="check"/>
              </li>
              <li className="difficulty-radio-wrapper">
                <Field name="difficultyLevel" component="input" type="radio"
                       value="MEDIUM" id="medium-option"/>
                {' '}
                <label htmlFor="medium-option">Medium</label>
                <div className="check"><div className="inside" /></div>
              </li>
              <li className="difficulty-radio-wrapper">
                <Field name="difficultyLevel" component="input" type="radio"
                       value="HARD" id="hard-option"/>
                {' '}
                <label htmlFor="hard-option">Hard</label>
                <div className="check"><div className="inside" /></div>
              </li>
              <Field name="difficultyLevel"
                     component={renderError}/>
            </ul>


          </div>
          <div>
            <label htmlFor="kcal">Calories</label>
            <Field name="kcal"
                   type="text"
                   component={renderField}
                   validate={[isIntegerValidator, lessThenInt]}
                   normalize={integerNormalizer}
                   label="kcal"/>
          </div>
          <div>
            <label htmlFor="servings">Servings</label>
            <Field name="servings"
                   type="text"
                   component={renderField}
                   validate={[isIntegerValidator, lessThenInt]}
                   normalize={integerNormalizer}
                   label="Servings"/>
          </div>

          <div className="nav-buttons">
            <Button type="button" className="previous" onClick={previousPage}>Previous</Button>
            <Button type="submit" className="next">Next</Button>
          </div>
        </form>
    );
  }
}

export default reduxForm({
  form: 'add-recipe-wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateDifficultyLevel
})(WizardFormSecondPage);