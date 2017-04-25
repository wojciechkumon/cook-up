import {combineReducers} from "redux";
import {
  REQUEST_RECIPE,
  RECEIVE_RECIPE,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  REQUEST_AUTHOR,
  RECEIVE_AUTHOR,
  SET_FOUND_RECIPE_IDS
} from "../actions/actions";

function foundRecipeIds(state = [], action) {
  switch (action.type) {
    case SET_FOUND_RECIPE_IDS:
      return action.recipeIds;
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
    default:
      return state;
  }
}

function commentsByRecipeId(state = {}, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
    case RECEIVE_COMMENTS:
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