package cookup.service.recipe;

import cookup.domain.recipe.Recipe;
import cookup.dto.RecipeDto;

public interface RecipeService {

  Recipe addRecipe(RecipeDto recipeDto, String userEmail);

  void addToFavourites(long recipeId, String userEmail);

  void removeFromFavourites(long recipeId, String userEmail);
}
