package cookup.service.recipe;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

import cookup.domain.recipe.Recipe;

public interface RecipeFinder {

  Page<Recipe> findMatchingRecipes(List<Long> ingredientIds, Pageable pageable);
}
