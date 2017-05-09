import {combineReducers} from "redux";
import {
  INGREDIENTS_REQUEST_ERROR,
  RECEIVE_INGREDIENTS,
  REQUEST_INGREDIENTS,
  SET_CHOSEN_INGREDIENTS
} from "../actions/actions";

function chosenIngredients(state = [], action) {
  switch (action.type) {
    case SET_CHOSEN_INGREDIENTS:
      return action.ingredients;
    default:
      return state;
  }
}

function allIngredients(state = {
      isFetching: false,
      didInvalidate: false,
      data: [],
      error: false
    },
    action) {
  switch (action.type) {
    case REQUEST_INGREDIENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_INGREDIENTS:
      return {
        isFetching: false,
        didInvalidate: false,
        data: action.allIngredients,
        lastUpdated: action.receivedAt,
        error: false
      };
    case INGREDIENTS_REQUEST_ERROR:
      return {
        isFetching: false,
        didInvalidate: false,
        data: [],
        lastUpdated: action.receivedAt,
        error: action.errorType
      };
    default:
      return state;
  }
}

const ingredients = combineReducers({
  chosenIngredients,
  allIngredients
});

export default ingredients;