package cookup.service.recipe;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import cookup.dao.RecipeDao;
import cookup.domain.recipe.Recipe;
import cookup.service.util.TimeUtil;

@Service
public class RecipeServiceImpl implements RecipeService {
  private final RecipeDao recipeDao;
  private final TimeUtil timeUtil;

  RecipeServiceImpl(RecipeDao recipeDao, TimeUtil timeUtil) {
    this.recipeDao = recipeDao;
    this.timeUtil = timeUtil;
  }

  @Override
  public Recipe save(Recipe recipe) {
    LocalDateTime now = timeUtil.now();
    if (recipe.getCreated() == null) {
      recipe.setCreated(now);
    }
    recipe.setUpdated(now);
    return recipeDao.save(recipe);
  }
}
