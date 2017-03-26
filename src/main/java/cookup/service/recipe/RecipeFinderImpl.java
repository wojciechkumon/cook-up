package cookup.service.recipe;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import cookup.dao.RecipeDao;
import cookup.domain.recipe.Recipe;

@Service
public class RecipeFinderImpl implements RecipeFinder {
  private final RecipeDao recipeDao;

  RecipeFinderImpl(RecipeDao recipeDao) {
    this.recipeDao = recipeDao;
  }

  @Override
  public Page<Recipe> findMatchingRecipes(List<Long> ingredientIds, Pageable pageable) {
    List<Long> recipeIds = recipeDao.findMatchingRecipeIds(ingredientIds);

    return recipeDao.findByIdIn(recipeIds, pageable);
  }
}
