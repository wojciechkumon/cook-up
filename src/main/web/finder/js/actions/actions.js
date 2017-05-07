import client from "../../../restclient/client";
import {getHttpError} from "../../../main/js/actions/actions";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';
export const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';
export const RECEIVE_INGREDIENTS = 'RECEIVE_INGREDIENTS';
export const INGREDIENTS_REQUEST_ERROR = 'INGREDIENTS_REQUEST_ERROR';

export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    ingredient: ingredient
  }
};

export const removeIngredient = (id) => {
  return {
    type: REMOVE_INGREDIENT,
    id: id
  }
};

export const clearIngredients = () => {
  return {
    type: CLEAR_INGREDIENTS
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