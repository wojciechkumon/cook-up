package cookup.service.recipe;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import cookup.dao.IngredientDao;
import cookup.dao.RecipeDao;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.Recipe;
import cookup.service.ingredients.SimilarIngredientsFinder;

@Service
public class RecipeFinderImpl implements RecipeFinder {
  private final RecipeDao recipeDao;
  private final IngredientDao ingredientDao;
  private final SimilarIngredientsFinder similarIngredientsFinder;

  RecipeFinderImpl(RecipeDao recipeDao, IngredientDao ingredientDao,
                   SimilarIngredientsFinder similarIngredientsFinder) {
    this.recipeDao = recipeDao;
    this.ingredientDao = ingredientDao;
    this.similarIngredientsFinder = similarIngredientsFinder;
  }

  @Override
  public Page<Recipe> findMatchingRecipes(List<Long> ingredientIds, Pageable pageable) {
    List<Long> recipeIds = recipeDao.findMatchingRecipeIds(ingredientIds);

    return recipeDao.findByIdIn(recipeIds, pageable);
  }

  @Override
  public Page<Recipe> findMatchingRecipesWithSimilarIngredients(List<Long> ingredientIds,
                                                                Pageable pageable) {
    List<Long> similarIngredientIds = ingredientDao.findAll(ingredientIds)
        .stream()
        .flatMap(ingredient -> similarIngredientsFinder.find(ingredient).stream())
        .map(Ingredient::getId)
        .collect(Collectors.toList());

    return findMatchingRecipes(similarIngredientIds, pageable);
  }
}
