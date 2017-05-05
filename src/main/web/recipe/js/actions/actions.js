import client from "../../../restclient/client";
import {getHttpError} from "../../../main/js/actions/actions";

export const REQUEST_RECIPE = 'REQUEST_RECIPE';
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE';
export const RECIPE_REQUEST_ERROR = 'RECIPE_REQUEST_ERROR';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const COMMENTS_REQUEST_ERROR = 'COMMENTS_REQUEST_ERROR';
export const INVALIDATE_COMMENTS = 'INVALIDATE_COMMENT';
export const REQUEST_AUTHOR = 'REQUEST_AUTHOR';
export const RECEIVE_AUTHOR = 'RECEIVE_AUTHOR';
export const AUTHOR_REQUEST_ERROR = 'AUTHOR_REQUEST_ERROR';
export const REQUEST_FOUND_RECIPES = 'REQUEST_FOUND_RECIPES';
export const RECEIVE_FOUND_RECIPES = 'RECEIVE_FOUND_RECIPES';

export function fetchRecipeIfNeeded(recipeId) {
  return (dispatch, getState) => {
    if (shouldFetchRecipe(getState(), recipeId)) {
      return dispatch(fetchRecipe(recipeId));
    }
    return Promise.resolve();
  }
}

export function fetchCommentsIfNeeded(recipeId) {
  return (dispatch, getState) => {
    if (shouldFetchComments(getState(), recipeId)) {
      return dispatch(fetchComments(recipeId));
    }
    return Promise.resolve();
  }
}

export function invalidateComments(recipeId) {
  return {
    type: INVALIDATE_COMMENTS,
    recipeId
  }
}

export function fetchAuthorIfNeeded(recipeId) {
  return (dispatch, getState) => {
    if (shouldFetchAuthor(getState(), recipeId)) {
      return dispatch(fetchAuthor(recipeId));
    }
    return Promise.resolve();
  }
}

function shouldFetchRecipe(state, recipeId) {
  return shouldFetch(state.recipes.byId[recipeId]);
}

function shouldFetchAuthor(state, recipeId) {
  return shouldFetch(state.recipes.authorByRecipeId[recipeId]);
}

function shouldFetchComments(state, recipeId) {
  return shouldFetch(state.recipes.commentsByRecipeId[recipeId]);
}

function shouldFetch(object) {
  if (!object) {
    return true;
  } else if (object.isFetching) {
    return false;
  } else {
    return object.didInvalidate;
  }
}

function fetchRecipe(recipeId) {
  return dispatch => {
    dispatch(requestRecipe(recipeId));

    return client({method: 'GET', path: '/api/recipes/' + recipeId})
      .then(response => response.entity)
      .then(recipe => dispatch(receiveRecipe(recipe)))
      .catch(response => dispatch(recipeRequestError(recipeId, getHttpError(response))));
  }
}

function fetchComments(recipeId) {
  return dispatch => {
    dispatch(requestComments(recipeId));

    return client(
      {method: 'GET', path: '/api/recipes/' + recipeId + '/comments'})
      .then(response => response.entity)
      .then(entity => entity && entity._embedded ? entity._embedded.recipeCommentDtoes : [])
      .then(comments => dispatch(receiveComments(recipeId, comments)))
      .catch(response => dispatch(commentsRequestError(recipeId, getHttpError(response))));
  }
}

function fetchAuthor(recipeId) {
  return dispatch => {
    dispatch(requestAuthor(recipeId));

    return client(
      {method: 'GET', path: '/api/recipes/' + recipeId + '/author'})
      .then(response => response.entity)
      .then(author => dispatch(receiveAuthor(recipeId, author)))
      .catch(response => dispatch(authorRequestError(recipeId, getHttpError(response))));
  }
}

function requestRecipe(recipeId) {
  return {
    type: REQUEST_RECIPE,
    recipeId
  }
}

function receiveRecipe(recipe) {
  return {
    type: RECEIVE_RECIPE,
    recipeId: recipe.id,
    recipe,
    receivedAt: Date.now()
  }
}

function recipeRequestError(recipeId, errorType) {
  return {
    type: RECIPE_REQUEST_ERROR,
    recipeId,
    errorType,
    receivedAt: Date.now()
  }
}

function requestComments(recipeId) {
  return {
    type: REQUEST_COMMENTS,
    recipeId
  }
}

function receiveComments(recipeId, comments) {
  return {
    type: RECEIVE_COMMENTS,
    recipeId,
    comments,
    receivedAt: Date.now()
  }
}

function commentsRequestError(recipeId, errorType) {
  return {
    type: COMMENTS_REQUEST_ERROR,
    recipeId,
    errorType,
    receivedAt: Date.now()
  }
}

function requestAuthor(recipeId) {
  return {
    type: REQUEST_AUTHOR,
    recipeId
  }
}

function receiveAuthor(recipeId, author) {
  return {
    type: RECEIVE_AUTHOR,
    recipeId,
    author,
    receivedAt: Date.now()
  }
}

function authorRequestError(recipeId, errorType) {
  return {
    type: AUTHOR_REQUEST_ERROR,
    recipeId,
    errorType,
    receivedAt: Date.now()
  }
}

export function fetchMatchingRecipesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetchMatchingRecipes(state)) {
      return dispatch(fetchMatchingRecipes(state));
    }
    return Promise.resolve();
  }
}

function shouldFetchMatchingRecipes(state) {
  const ingredients = state.ingredients.chosenIngredients;
  const foundRecipes = state.recipes.foundRecipeIds;

  if (ingredients.length === 0) {
    return false;
  } else if (!foundRecipes) {
    return true;
  } else {
    return !foundRecipes.isFetching;
  }
}

function fetchMatchingRecipes(state) {
  return dispatch => {
    dispatch(requestMatchingRecipes());
    const ingredientIds = state.ingredients.chosenIngredients
      .map(i => i.id)
      .join();
    return client({method: 'GET', path: '/api/matchingRecipes?ingredients=' + ingredientIds})
      .then(response => response.entity)
      .then(
        entity => (entity._embedded && entity._embedded.recipes) ? entity._embedded.recipes : [])
      .then(recipes => dispatch(receiveMatchingRecipes(recipes)));
  }
}

function requestMatchingRecipes() {
  return {
    type: REQUEST_FOUND_RECIPES
  }
}

function receiveMatchingRecipes(recipes) {
  return {
    type: RECEIVE_FOUND_RECIPES,
    recipes,
    receivedAt: Date.now()
  }
}