export const ADD_RECIPE = 'ADD_RECIPE';
export const SET_FOUND_RECIPE_IDS = 'SET_FOUND_RECIPE_IDS';

export const addRecipe = (recipe) => {
  return {
    type: ADD_RECIPE,
    recipe: recipe
  }
};

export const setFoundRecipeIds = (recipeIds) => {
  return {
    type: SET_FOUND_RECIPE_IDS,
    recipeIds: recipeIds
  }
};