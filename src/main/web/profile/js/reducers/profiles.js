import {combineReducers} from "redux";
import {
  RECEIVE_PROFILE_ACCOUNT,
  RECEIVE_PROFILE_CREATED_RECIPES,
  RECEIVE_PROFILE_FAVOURITE_RECIPES,
  REQUEST_PROFILE_ACCOUNT,
  REQUEST_PROFILE_CREATED_RECIPES,
  REQUEST_PROFILE_FAVOURITE_RECIPES
} from "../actions/actions";

function handleProfile(state = {createdRecipeIds: {}, favouriteRecipeIds: {}, account: {}},
                       action) {
  switch (action.type) {
    case REQUEST_PROFILE_CREATED_RECIPES:
    case RECEIVE_PROFILE_CREATED_RECIPES:
      return Object.assign({}, state, {
        createdRecipeIds: createdRecipeIds(state.createdRecipeIds, action)
      });
    case REQUEST_PROFILE_FAVOURITE_RECIPES:
    case RECEIVE_PROFILE_FAVOURITE_RECIPES:
      return Object.assign({}, state, {
        favouriteRecipeIds: favouriteRecipeIds(state.favouriteRecipeIds, action)
      });
    case REQUEST_PROFILE_ACCOUNT:
    case RECEIVE_PROFILE_ACCOUNT:
      return Object.assign({}, state, {
        account: account(state.favouriteRecipeIds, action)
      });
    default:
      return state;
  }
}

function createdRecipeIds(state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case REQUEST_PROFILE_CREATED_RECIPES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PROFILE_CREATED_RECIPES:
      return {
        isFetching: false,
        data: action.recipes.map(recipe => recipe.id),
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function favouriteRecipeIds(state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case REQUEST_PROFILE_FAVOURITE_RECIPES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PROFILE_FAVOURITE_RECIPES:
      return {
        isFetching: false,
        data: action.recipes.map(recipe => recipe.id),
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function account(state = {isFetching: false, data: []}, action) {
  switch (action.type) {
    case REQUEST_PROFILE_ACCOUNT:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PROFILE_ACCOUNT:
      return {
        isFetching: false,
        data: action.account,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case REQUEST_PROFILE_CREATED_RECIPES:
    case RECEIVE_PROFILE_CREATED_RECIPES:
    case REQUEST_PROFILE_FAVOURITE_RECIPES:
    case RECEIVE_PROFILE_FAVOURITE_RECIPES:
    case REQUEST_PROFILE_ACCOUNT:
    case RECEIVE_PROFILE_ACCOUNT:
      return Object.assign({}, state, {
        [action.profileId]: handleProfile(state[action.profileId], action)
      });
    default:
      return state;
  }
}

const profiles = combineReducers({
  byId
});

export default profiles;