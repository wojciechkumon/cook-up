package cookup.service.recipe;

import cookup.domain.account.Account;
import cookup.domain.recipe.Recipe;

public interface RecipeService {

  Recipe save(Recipe recipe);

  Account addFavouriteRecipe(String email, Recipe recipe);
}
