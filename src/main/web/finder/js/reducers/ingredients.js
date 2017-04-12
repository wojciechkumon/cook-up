import {combineReducers} from 'redux';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_INGREDIENTS
} from '../actions/actions';

function idAlreadyOnList(state, newIngredient) {
  return state.find((element) => element.id === newIngredient.id);
}

function ingredients(state = [], action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      const ingredient = action.ingredient;

      if (idAlreadyOnList(state, ingredient)) {
        return state;
      }
      return [
        ...state,
        {
          id: ingredient.id,
          name: ingredient.name,
          ingredientUnit: ingredient.ingredientUnit
        }
      ];
    case REMOVE_INGREDIENT:
      return state.filter((ingredient) => ingredient.id !== action.id);
    case CLEAR_INGREDIENTS:
      return [];
    default:
      return state
  }
}

export default ingredients;