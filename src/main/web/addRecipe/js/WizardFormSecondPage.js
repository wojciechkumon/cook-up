import React, {Component} from "react";
import Field from "redux-form/es/Field";
import reduxForm from "redux-form/es/reduxForm";
import {renderError, renderField} from "../../util/js/forms";
import {isIntegerValidator, lessThen} from "../../util/js/validators";
import {integerNormalizer} from "../../util/js/formNormalizers";

const lessThenInt = lessThen(Math.pow(2, 31) - 1);
const validateDifficultyLevel = values => {
  return values.difficultyLevel && ['EASY', 'MEDIUM', 'HARD'].includes(values.difficultyLevel)
    ? {} : {difficultyLevel: 'Specify difficulty level'}
};

class WizardFormSecondPage extends Component {

  render() {
    const {handleSubmit, previousPage} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cookingTimeMinutes">Cooking time (minutes)</label>
          <Field name="cookingTimeMinutes"
                 type="text"
                 component={renderField}
                 validate={[isIntegerValidator, lessThenInt]}
                 normalize={integerNormalizer}
                 label="Cooking time"/>
        </div>
        <div>
          <label>Difficulty level</label>
          <div>
            <label>
              <Field name="difficultyLevel" component="input" type="radio" value="EASY"/>
              {' '}
              Easy
            </label>
            <label>
              <Field name="difficultyLevel" component="input" type="radio" value="MEDIUM"/>
              {' '}
              Medium
            </label>
            <label>
              <Field name="difficultyLevel" component="input" type="radio" value="HARD"/>
              {' '}
              Hard
            </label>
            <Field name="difficultyLevel"
                   component={renderError}/>
          </div>
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

        <div>
          <button type="button" className="previous" onClick={previousPage}>Previous</button>
          <button type="submit" className="next">Next</button>
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