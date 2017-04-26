package cookup.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import cookup.domain.account.Account;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;
import cookup.domain.recipe.comment.Comment;

@Configuration
public class RestConfig extends RepositoryRestConfigurerAdapter {
  public static final String API_BASE_PATH = "/api";

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Recipe.class, RecipeIngredient.class, Ingredient.class,
        Account.class, Comment.class);
  }
}
