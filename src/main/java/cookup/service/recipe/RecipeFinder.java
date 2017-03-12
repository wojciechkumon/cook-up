package cookup.service.recipe;

import java.util.List;
import java.util.Set;

import cookup.domain.recipe.Recipe;

public interface RecipeFinder {

  Set<Recipe> findMatchingRecipes(List<Long> ingredientIds);
}
