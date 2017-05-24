import client from "../../../restclient/client";

export const REQUEST_FAVOURITE_RECIPES = 'REQUEST_FAVOURITE_RECIPES';
export const RECEIVE_FAVOURITE_RECIPES = 'RECEIVE_FAVOURITE_RECIPES';
export const REQUEST_CREATED_RECIPES = 'REQUEST_CREATED_RECIPES';
export const RECEIVE_CREATED_RECIPES = 'RECEIVE_CREATED_RECIPES';
export const REMOVE_CREATED_RECIPE = 'REMOVE_CREATED_RECIPE';

export function fetchFavouriteRecipesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchRecipes(getState().me.favouriteRecipeIds)) {
      return dispatch(fetchFavouriteRecipes(getState()));
    }
    return Promise.resolve();
  }
}

function shouldFetchRecipes(recipes) {
  if (!recipes) {
    return true;
  } else {
    return !recipes.isFetching;
  }
}

function fetchFavouriteRecipes(state) {
  return dispatch => {
    dispatch(requestFavouriteRecipes());
    const userId = state.auth.id;
    const path = '/api/accounts/' + userId + '/favouriteRecipes';
    return client({method: 'GET', path})
      .then(response => response.entity)
      .then(
        entity => (entity._embedded && entity._embedded.recipes) ? entity._embedded.recipes : [])
      .then(recipes => dispatch(receiveFavouriteRecipes(recipes)));
  }
}

function requestFavouriteRecipes() {
  return {
    type: REQUEST_FAVOURITE_RECIPES
  }
}

function receiveFavouriteRecipes(recipes) {
  return {
    type: RECEIVE_FAVOURITE_RECIPES,
    recipes,
    receivedAt: Date.now()
  }
}

export function fetchCreatedRecipesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchRecipes(getState().me.createdRecipeIds)) {
      return dispatch(fetchCreatedRecipes(getState()));
    }
    return Promise.resolve();
  }
}

function fetchCreatedRecipes(state) {
  return dispatch => {
    dispatch(requestCreatedRecipes());
    const userId = state.auth.id;
    const path = '/api/accounts/' + userId + '/createdRecipes';
    return client({method: 'GET', path})
      .then(response => response.entity)
      .then(
        entity => (entity._embedded && entity._embedded.recipes) ? entity._embedded.recipes : [])
      .then(recipes => dispatch(receiveCreatedRecipes(recipes)));
  }
}

function requestCreatedRecipes() {
  return {
    type: REQUEST_CREATED_RECIPES
  }
}

function receiveCreatedRecipes(recipes) {
  return {
    type: RECEIVE_CREATED_RECIPES,
    recipes,
    receivedAt: Date.now()
  }
}

export function deleteCreatedRecipe(recipeId) {
  return dispatch => {
    dispatch(removeCreatedRecipe(recipeId));

    const path = '/api/recipes/' + recipeId;
    return client({method: 'DELETE', path});
  };
}

function removeCreatedRecipe(recipeId) {
  return {
    type: REMOVE_CREATED_RECIPE,
    recipeId
  }
}