import {combineReducers} from "redux";
import {
  RECEIVE_CREATED_RECIPES,
  RECEIVE_FAVOURITE_RECIPES,
  REQUEST_CREATED_RECIPES,
  REQUEST_FAVOURITE_RECIPES
} from "../actions/actions";

function createdRecipes(state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case REQUEST_CREATED_RECIPES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CREATED_RECIPES:
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

function favouriteRecipeIds(state = {isFetching: false, data: []}, action) {
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