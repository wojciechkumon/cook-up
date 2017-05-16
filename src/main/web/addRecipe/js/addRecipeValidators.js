export const validateDifficultyLevel = values => {
  return values.difficultyLevel && ['EASY', 'MEDIUM', 'HARD'].includes(values.difficultyLevel)
    ? {} : {difficultyLevel: 'Specify difficulty level'}
};

export const validateIngredients = values => {
  const {ingredients} = values;
  if (!ingredients || ingredients.length === 0) {
    return {ingredientsError: 'Recipe must have ingredients'};
  }

  const ingredientsErrors = [];
  ingredients.forEach((ingredientForm, index) => {
    const {ingredient} = ingredientForm;
    const {substitutes} = ingredientForm;

    if (!ingredient) {
      ingredientsErrors[index] = {ingredient: 'Ingredient is required'};
    }
    if (substitutes && substitutes.includes(ingredient)) {
      ingredientsErrors[index] = {substitutes: 'Same ingredient in substitutes'};
    }
  });

  return {ingredients: ingredientsErrors};
};