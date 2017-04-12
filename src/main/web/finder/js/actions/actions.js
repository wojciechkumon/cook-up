export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

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
