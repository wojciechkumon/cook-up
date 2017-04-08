package cookup.config.dbinit;

import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import cookup.config.Profiles;
import cookup.dao.IngredientDao;

@Component
@Profile(Profiles.PRODUCTION)
public class ProdDbInit implements DbInitializer {
  private final RecipeDbInitializer dbInitializer;
  private final IngredientDao ingredientDao;

  public ProdDbInit(RecipeDbInitializer dbInitializer, IngredientDao ingredientDao) {
    this.dbInitializer = dbInitializer;
    this.ingredientDao = ingredientDao;
  }

  @Override
  @EventListener(ContextRefreshedEvent.class)
  public void init() {
    if (ingredientDao.count() <= 0) {
      dbInitializer.init();
    }
  }
}
