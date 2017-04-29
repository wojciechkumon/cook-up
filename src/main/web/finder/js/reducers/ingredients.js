import {combineReducers} from "redux";
import {
  ADD_INGREDIENT,
  CLEAR_INGREDIENTS,
  RECEIVE_INGREDIENTS,
  REMOVE_INGREDIENT,
  REQUEST_INGREDIENTS
} from "../actions/actions";

function idAlreadyOnList(state, newIngredient) {
  return state.find((element) => element.id === newIngredient.id);
}

function chosenIngredients(state = [], action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      const ingredient = action.ingredient;

      if (idAlreadyOnList(state, ingredient)) {
        return state;
      }
      return state.concat([ingredient]);
    case REMOVE_INGREDIENT:
      return state.filter((ingredient) => ingredient.id !== action.id);
    case CLEAR_INGREDIENTS:
      return [];
    default:
      return state;
  }
}

function allIngredients(state = {isFetching: false, didInvalidate: false, data: []},
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
        lastUpdated: action.receivedAt
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