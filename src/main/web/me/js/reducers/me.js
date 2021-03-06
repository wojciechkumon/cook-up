import {combineReducers} from "redux";
import {
  RECEIVE_CREATED_RECIPES,
  RECEIVE_FAVOURITE_RECIPES,
  REMOVE_CREATED_RECIPE,
  REQUEST_CREATED_RECIPES,
  REQUEST_FAVOURITE_RECIPES
} from "../actions/actions";

function createdRecipeIds(state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case REQUEST_CREATED_RECIPES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CREATED_RECIPES:
      return {
        isFetching: false,
        data: action.recipes.map(recipe => recipe.id),
        lastUpdated: action.receivedAt
      };
    case REMOVE_CREATED_RECIPE:
      return {
        data: state.data.filter(id => id !== action.recipeId)
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
        lastUpdated: action.receivedAt
      };
    case REMOVE_CREATED_RECIPE:
      return {
        data: state.data.filter(id => id !== action.recipeId)
      };
    default:
      return state;
  }
}

const me = combineReducers({
  createdRecipeIds,
  favouriteRecipeIds
});

export default me;