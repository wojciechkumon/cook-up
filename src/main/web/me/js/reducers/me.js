import {combineReducers} from "redux";
import {RECEIVE_FAVOURITE_RECIPES, REQUEST_FAVOURITE_RECIPES} from "../actions/actions";

function createdRecipes(state = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

function favouriteRecipeIds(state = {isFetching: false, data: [], afterSearch: false},
                            action) {
  switch (action.type) {
    case REQUEST_FAVOURITE_RECIPES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_FAVOURITE_RECIPES:
      return {
        isFetching: false,
        data: action.recipes.map(recipe => recipe.id),
        lastUpdated: action.receivedAt,
        afterSearch: true
      };
    default:
      return state;
  }
}

const me = combineReducers({
  createdRecipes,
  favouriteRecipeIds
});

export default me;