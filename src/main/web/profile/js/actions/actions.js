import client from "../../../restclient/client";

export const REQUEST_PROFILE_FAVOURITE_RECIPES = 'REQUEST_PROFILE_FAVOURITE_RECIPES';
export const RECEIVE_PROFILE_FAVOURITE_RECIPES = 'RECEIVE_PROFILE_FAVOURITE_RECIPES';
export const REQUEST_PROFILE_CREATED_RECIPES = 'REQUEST_PROFILE_CREATED_RECIPES';
export const RECEIVE_PROFILE_CREATED_RECIPES = 'RECEIVE_PROFILE_CREATED_RECIPES';

export function fetchFavouriteRecipesIfNeeded(profileId) {
  return (dispatch, getState) => {
    if (shouldFetchFavouriteRecipes(getState().profiles.byId[profileId])) {
      return dispatch(fetchFavouriteRecipes(profileId));
    }
    return Promise.resolve();
  }
}

function shouldFetchFavouriteRecipes(profile) {
  if (!profile || !profile.favouriteRecipeIds) {
    return true;
  } else {
    return !profile.favouriteRecipeIds.isFetching;
  }
}

function fetchFavouriteRecipes(profileId) {
  return dispatch => {
    dispatch(requestFavouriteRecipes(profileId));
    const path = '/api/accounts/' + profileId + '/favouriteRecipes';
    return client({method: 'GET', path})
      .then(response => response.entity)
      .then(
        entity => (entity._embedded && entity._embedded.recipes) ? entity._embedded.recipes : [])
      .then(recipes => dispatch(receiveFavouriteRecipes(recipes, profileId)));
  }
}

function requestFavouriteRecipes(profileId) {
  return {
    type: REQUEST_PROFILE_FAVOURITE_RECIPES,
    profileId
  }
}

function receiveFavouriteRecipes(recipes, profileId) {
  return {
    type: RECEIVE_PROFILE_FAVOURITE_RECIPES,
    profileId,
    recipes,
    receivedAt: Date.now()
  }
}

export function fetchCreatedRecipesIfNeeded(profileId) {
  return (dispatch, getState) => {
    if (shouldFetchCreatedRecipes(getState().profiles.byId[profileId])) {
      return dispatch(fetchCreatedRecipes(profileId));
    }
    return Promise.resolve();
  }
}

function shouldFetchCreatedRecipes(profile) {
  if (!profile || !profile.createdRecipeIds) {
    return true;
  } else {
    return !profile.createdRecipeIds.isFetching;
  }
}

function fetchCreatedRecipes(profileId) {
  return dispatch => {
    dispatch(requestCreatedRecipes(profileId));
    const path = '/api/accounts/' + profileId + '/createdRecipes';
    return client({method: 'GET', path})
      .then(response => response.entity)
      .then(
        entity => (entity._embedded && entity._embedded.recipes) ? entity._embedded.recipes : [])
      .then(recipes => dispatch(receiveCreatedRecipes(recipes, profileId)));
  }
}

function requestCreatedRecipes(profileId) {
  return {
    type: REQUEST_PROFILE_CREATED_RECIPES,
    profileId
  }
}

function receiveCreatedRecipes(recipes, profileId) {
  return {
    type: RECEIVE_PROFILE_CREATED_RECIPES,
    profileId,
    recipes,
    receivedAt: Date.now()
  }
}