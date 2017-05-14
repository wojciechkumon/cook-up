import client from "../../restclient/client";
import {reset} from "redux-form/es/actions";

export const handleSubmit = dispatch => values => {
  const path = '/api/recipes';
  const recipeDto = {
    name: values.name,
    cookingDescription: values.cookingDescription,
    cookingTimeMinutes: Number(values.cookingTimeMinutes),
    difficultyLevel: values.difficultyLevel,
    kcal: Number(values.kcal),
    servings: Number(values.servings),
    ingredients: []
  };

  return client({method: 'POST', path, entity: recipeDto})
    .then(() => dispatch(reset('add-recipe-wizard')))
    .catch(response => {
      console.log(response);
      console.log('error');
    });
};
