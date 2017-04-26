import client from "../../../restclient/client";

export const REQUEST_RECIPE = 'REQUEST_RECIPE';
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE';
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_AUTHOR = 'REQUEST_AUTHOR';
export const RECEIVE_AUTHOR = 'RECEIVE_AUTHOR';
export const SET_FOUND_RECIPE_IDS = 'SET_FOUND_RECIPE_IDS';


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

export function fetchAuthorIfNeeded(recipeId) {
  return (dispatch, getState) => {
    if (shouldFetchAuthor(getState(), recipeId)) {
      return dispatch(fetchAuthor(recipeId));
    }
    return Promise.resolve();
  }
}

export const setFoundRecipeIds = (recipeIds) => {
  return {
    type: SET_FOUND_RECIPE_IDS,
    recipeIds: recipeIds
  }
};

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
      .then(recipe => dispatch(receiveRecipe(recipe)));
  }
}

function fetchComments(recipeId) {
  return dispatch => {
    dispatch(requestComments(recipeId));

    return client(
      {method: 'GET', path: '/api/recipes/' + recipeId + '/comments'})
      .then(response => response.entity)
      .then(entity => entity && entity._embedded ? entity._embedded.recipeCommentDtoes : [])
      .then(comments => dispatch(receiveComments(recipeId, comments)));
  }
}

function fetchAuthor(recipeId) {
  return dispatch => {
    dispatch(requestAuthor(recipeId));

    return client(
      {method: 'GET', path: '/api/recipes/' + recipeId + '/author'})
      .then(response => response.entity)
      .then(author => dispatch(receiveAuthor(recipeId, author)));
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
