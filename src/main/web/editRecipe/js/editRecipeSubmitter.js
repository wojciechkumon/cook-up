import client from "../../restclient/client";
import {reset} from "redux-form";
import {invalidateRecipe} from "../../recipe/js/actions/actions";

export const handleSubmit = (dispatch, history, recipeId) => values => {
  const path = '/api/recipes/' + recipeId;
  const recipeDto = {
    name: values.name,
    cookingDescription: values.cookingDescription,
    cookingTimeMinutes: parseInt(Number(values.cookingTimeMinutes)),
    difficultyLevel: values.difficultyLevel,
    kcal: parseInt(Number(values.kcal)),
    servings: parseInt(Number(values.servings)),
    ingredients: values.ingredients
  };

  return client({method: 'PUT', path, entity: recipeDto})
    .then(response => {
      dispatch(invalidateRecipe(recipeId));
      return response;
    }).then(response => history.push('/recipe/' + recipeId))
    .then(() => dispatch(reset('edit-recipe-wizard')))
    .catch(response => {});
};
