export function mapToInitialValues(recipe) {
  const initialValues = {};
  initialValues.name = recipe.name;
  initialValues.cookingDescription = recipe.cookingDescription;
  initialValues.cookingTimeMinutes = recipe.cookingTimeMinutes;
  initialValues.difficultyLevel = recipe.difficultyLevel;
  initialValues.kcal = recipe.kcal;
  initialValues.servings = recipe.servings;
  initialValues.ingredients = mapRecipeIngredients(recipe.ingredients);

  return initialValues;
}

function mapRecipeIngredients(recipeIngredients) {
  if (!recipeIngredients) {
    return [];
  }
  return recipeIngredients.map(recipeIngredient => {
    return {
      amount: recipeIngredient.amount,
      ingredient: recipeIngredient.ingredient,
      substitutes: recipeIngredient.substitutes
    };
  });
}