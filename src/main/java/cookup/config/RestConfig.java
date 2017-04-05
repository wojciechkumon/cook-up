package cookup.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.Recipe;

@Configuration
public class RestConfig extends RepositoryRestConfigurerAdapter {
  public static final String API_BASE_PATH = "/api";

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Ingredient.class, Recipe.class);
  }
}
