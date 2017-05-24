package cookup.service.recipe;

import cookup.domain.recipe.Recipe;
import cookup.dto.RecipeDto;

public interface RecipeService {

  Recipe addRecipe(RecipeDto recipeDto, String userEmail);

  Recipe updateRecipe(Long recipeId, RecipeDto recipeDto, String name);

  void addToFavourites(long recipeId, String userEmail);

  void removeFromFavourites(long recipeId, String userEmail);

  void deleteRecipe(long recipeId, String userEmail);
}
