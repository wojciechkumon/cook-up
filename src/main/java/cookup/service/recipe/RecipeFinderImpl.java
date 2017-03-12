package cookup.service.recipe;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import cookup.dao.RecipeDao;
import cookup.domain.recipe.Recipe;

@Service
public class RecipeFinderImpl implements RecipeFinder {
  private final RecipeDao recipeDao;

  RecipeFinderImpl(RecipeDao recipeDao) {
    this.recipeDao = recipeDao;
  }

  @Override
  public Set<Recipe> findMatchingRecipes(List<Long> ingredientIds) {
    long start = System.currentTimeMillis();
    List<Long> recipeIds = recipeDao.findMatchingRecipeIds(ingredientIds);

    Set<Recipe> matchingRecipes = new HashSet<>();
    recipeDao.findAll(recipeIds).forEach(matchingRecipes::add);

    System.out.println("millis: " + (System.currentTimeMillis() - start));
    return matchingRecipes;
  }
}
