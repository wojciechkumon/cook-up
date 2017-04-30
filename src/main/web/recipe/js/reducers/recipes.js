import {combineReducers} from "redux";
import {
  INVALIDATE_COMMENTS,
  RECEIVE_AUTHOR,
  RECEIVE_COMMENTS,
  RECEIVE_FOUND_RECIPES,
  RECEIVE_RECIPE,
  REQUEST_AUTHOR,
  REQUEST_COMMENTS,
  REQUEST_FOUND_RECIPES,
  REQUEST_RECIPE
} from "../actions/actions";

function foundRecipeIds(state = {isFetching: false, data: []},
                        action) {
  switch (action.type) {
    case REQUEST_FOUND_RECIPES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_FOUND_RECIPES:
      return {
        isFetching: false,
        data: action.recipes.map(recipe => recipe.id),
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function handleRecipe(state = {isFetching: false, didInvalidate: false},
                      action) {
  switch (action.type) {
    case REQUEST_RECIPE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_RECIPE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.recipe,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case REQUEST_RECIPE:
    case RECEIVE_RECIPE:
      return Object.assign({}, state, {
        [action.recipeId]: handleRecipe(state[action.recipeId], action)
      });
    case RECEIVE_FOUND_RECIPES:
      const recipes = action.recipes.map(recipe => {
        return {
          isFetching: false,
          didInvalidate: false,
          data: recipe,
          lastUpdated: action.receivedAt
        }
      }).reduce((object, recipe) => {
        object[recipe.data.id] = recipe;
        return object;
      }, {});
      return Object.assign({}, state, recipes);
    default:
      return state;
  }
}

function handleComments(state = {isFetching: false, didInvalidate: false},
                        action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.comments,
        lastUpdated: action.receivedAt
      });
    case INVALIDATE_COMMENTS:
      return Object.assign({}, state, {didInvalidate: true});
    default:
      return state;
  }
}

function commentsByRecipeId(state = {}, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
    case RECEIVE_COMMENTS:
    case INVALIDATE_COMMENTS:
      return Object.assign({}, state, {
        [action.recipeId]: handleComments(state[action.recipeId], action)
      });
    default:
      return state;
  }
}

function handleAuthor(state = {isFetching: false, didInvalidate: false},
                      action) {
  switch (action.type) {
    case REQUEST_AUTHOR:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_AUTHOR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.author,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function authorByRecipeId(state = {}, action) {
  switch (action.type) {
    case REQUEST_AUTHOR:
    case RECEIVE_AUTHOR:
      return Object.assign({}, state, {
        [action.recipeId]: handleAuthor(state[action.recipeId], action)
      });
    default:
      return state;
  }
}

const recipes = combineReducers({
  foundRecipeIds,
  byId,
  commentsByRecipeId,
  authorByRecipeId
});

export default recipes;