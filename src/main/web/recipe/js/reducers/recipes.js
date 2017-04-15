import {combineReducers} from "redux";
import {ADD_RECIPE, SET_FOUND_RECIPE_IDS} from "../actions/actions";

function foundRecipeIds(state = [], action) {
  switch (action.type) {
    case SET_FOUND_RECIPE_IDS:
      return action.recipeIds;
    default:
      return state;
  }
}

function recipeList(state = [], action) {
  switch (action.type) {
    case ADD_RECIPE:
      const recipe = action.recipe;
      return state.filter(r => r.id !== recipe.id)
        .concat([recipe]);
    default:
      return state
  }
}

const recipes = combineReducers({
  foundRecipeIds,
  recipeList
});

export default recipes;