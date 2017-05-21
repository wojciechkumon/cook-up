import client from "../../../restclient/client";

export const REQUEST_FAVOURITE_RECIPES = 'REQUEST_FAVOURITE_RECIPES';
export const RECEIVE_FAVOURITE_RECIPES = 'RECEIVE_FAVOURITE_RECIPES';
export const REQUEST_CREATED_RECIPES = 'REQUEST_CREATED_RECIPES';
export const RECEIVE_CREATED_RECIPES = 'RECEIVE_CREATED_RECIPES';

export function fetchFavouriteRecipesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchFavouriteRecipes(getState())) {
      return dispatch(fetchFavouriteRecipes(getState()));
    }
    return Promise.resolve();
  }
}

function shouldFetchFavouriteRecipes(state) {
  const favouriteRecipes = state.me.favouriteRecipeIds;

  if (!favouriteRecipes) {
    return true;
  } else {
    return !favouriteRecipes.isFetching;
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