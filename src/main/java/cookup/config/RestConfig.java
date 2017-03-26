package cookup.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import cookup.domain.account.Account;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.Recipe;

@Configuration
public class RestConfig extends RepositoryRestConfigurerAdapter {

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Ingredient.class, Recipe.class, Account.class);
  }
}
