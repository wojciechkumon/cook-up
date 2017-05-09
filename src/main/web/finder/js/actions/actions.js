import client from "../../../restclient/client";
import {getHttpError} from "../../../main/js/actions/actions";

export const SET_CHOSEN_INGREDIENTS = 'SET_CHOSEN_INGREDIENTS';
export const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';
export const RECEIVE_INGREDIENTS = 'RECEIVE_INGREDIENTS';
export const INGREDIENTS_REQUEST_ERROR = 'INGREDIENTS_REQUEST_ERROR';

export const setChosenIngredients = ingredients => {
  return {
    type: SET_CHOSEN_INGREDIENTS,
    ingredients
  }
};

export function fetchIngredientsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchIngredients(getState())) {
      return dispatch(fetchIngredients());
    }
    return Promise.resolve();
  }
}

function shouldFetchIngredients(state) {
  const object = state.ingredients.allIngredients;
  if (!object) {
    return true;
  } else if (object.isFetching) {
    return false;
  } else if (!object.data || object.data.length === 0) {
    return true;
  } else {
    return object.didInvalidate;
  }
}

function fetchIngredients() {
  return dispatch => {
    dispatch(requestIngredients());

    return client({method: 'GET', path: '/api/ingredients'})
      .then(response => response.entity)
      .then(ingredients => dispatch(receiveIngredients(ingredients)))
      .catch(response => dispatch(ingredientsRequestError(getHttpError(response))));
  }
}

function requestIngredients() {
  return {
    type: REQUEST_INGREDIENTS
  }
}

function receiveIngredients(allIngredients) {
  return {
    type: RECEIVE_INGREDIENTS,
    allIngredients,
    receivedAt: Date.now()
  }
}

function ingredientsRequestError(errorType) {
  return {
    type: INGREDIENTS_REQUEST_ERROR,
    errorType,
    receivedAt: Date.now()
  }
}