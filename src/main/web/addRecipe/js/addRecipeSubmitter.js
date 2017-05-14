import client from "../../restclient/client";
import {reset} from "redux-form/es/actions";

export const handleSubmit = dispatch => values => {
  const path = '/api/recipes';
  const recipeDto = {
    name: values.name,
    cookingDescription: values.cookingDescription,
    cookingTimeMinutes: parseInt(Number(values.cookingTimeMinutes)),
    difficultyLevel: values.difficultyLevel,
    kcal: parseInt(Number(values.kcal)),
    servings: parseInt(Number(values.servings)),
    ingredients: values.ingredients
  };

  return client({method: 'POST', path, entity: recipeDto})
    .then(() => dispatch(reset('add-recipe-wizard')))
    .catch(response => {
      console.log(response);
      console.log('error');
    });
};
