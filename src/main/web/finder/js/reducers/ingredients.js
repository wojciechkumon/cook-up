import {combineReducers} from "redux";
import {
  ADD_INGREDIENT,
  CLEAR_INGREDIENTS,
  REMOVE_INGREDIENT,
  SET_ALL_INGREDIENTS
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

function allIngredients(state = [], action) {
  switch (action.type) {
    case SET_ALL_INGREDIENTS:
      return action.allIngredients;
    default:
      return state;
  }
}

const ingredients = combineReducers({
  chosenIngredients,
  allIngredients
});

export default ingredients;