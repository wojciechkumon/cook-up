import {combineReducers} from "redux";
import {
  AUTHOR_REQUEST_ERROR,
  COMMENTS_REQUEST_ERROR,
  INVALIDATE_COMMENTS,
  RECEIVE_AUTHOR,
  RECEIVE_COMMENTS,
  RECEIVE_FOUND_RECIPES,
  RECEIVE_RECIPE,
  RECEIVE_RECIPE_FAVOURITE,
  RECIPE_REQUEST_ERROR,
  REQUEST_AUTHOR,
  REQUEST_COMMENTS,
  REQUEST_FOUND_RECIPES,
  REQUEST_RECIPE,
  REQUEST_RECIPE_FAVOURITE
} from "../actions/actions";

function foundRecipeIds(state = {isFetching: false, data: [], afterSearch: false},
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
        lastUpdated: action.receivedAt,
        afterSearch: true
      };
    default:
      return state;
  }
}

function handleRecipe(state = {
                        isFetching: false,
                        didInvalidate: false,
                        error: false,
                        isFavouriteFetching: false
                      },
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
        lastUpdated: action.receivedAt,
        error: false
      });
    case RECIPE_REQUEST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        error: action.errorType,
        lastUpdated: action.receivedAt
      });
    case REQUEST_RECIPE_FAVOURITE:
      return Object.assign({}, state, {
        isFavouriteFetching: true
      });
    case RECEIVE_RECIPE_FAVOURITE:
      return Object.assign({}, state, {
        isFavouriteFetching: false,
        isFavourite: action.isFavourite
      });
    default:
      return state;
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case REQUEST_RECIPE:
    case RECEIVE_RECIPE:
    case RECIPE_REQUEST_ERROR:
    case REQUEST_RECIPE_FAVOURITE:
    case RECEIVE_RECIPE_FAVOURITE:
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

function handleComments(state = {isFetching: false, didInvalidate: false, error: false},
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
        lastUpdated: action.receivedAt,
        error: false
      });
    case INVALIDATE_COMMENTS:
      return Object.assign({}, state, {didInvalidate: true, error: false});
    case COMMENTS_REQUEST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        error: action.errorType,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function commentsByRecipeId(state = {}, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
    case RECEIVE_COMMENTS:
    case INVALIDATE_COMMENTS:
    case COMMENTS_REQUEST_ERROR:
      return Object.assign({}, state, {
        [action.recipeId]: handleComments(state[action.recipeId], action)
      });
    default:
      return state;
  }
}

function handleAuthor(state = {isFetching: false, didInvalidate: false, error: false},
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
        lastUpdated: action.receivedAt,
        error: false
      });
    case AUTHOR_REQUEST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        error: action.errorType,
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
    case AUTHOR_REQUEST_ERROR:
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