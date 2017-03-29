package cookup.service.recipe;

import cookup.domain.recipe.Recipe;

public interface RecipeService {

  Recipe addRecipe(Recipe recipe, String userEmail);

  void addToFavourites(long recipeId, String userEmail);

  void removeFromFavourites(long recipeId, String userEmail);
}
