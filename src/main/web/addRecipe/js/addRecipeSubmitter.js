import client from "../../restclient/client";
import {reset} from "redux-form";

export const handleSubmit = (dispatch, history) => values => {
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
    .then(response => history.push('/recipe/' + response.entity.id))
    .then(() => dispatch(reset('add-recipe-wizard')))
    .catch(response => {});
};
