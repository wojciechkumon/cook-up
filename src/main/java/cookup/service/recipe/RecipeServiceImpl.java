package cookup.service.recipe;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import cookup.dao.AccountDao;
import cookup.dao.RecipeDao;
import cookup.domain.account.Account;
import cookup.domain.recipe.Recipe;
import cookup.service.util.TimeUtil;

@Service
public class RecipeServiceImpl implements RecipeService {
  private final RecipeDao recipeDao;
  private final AccountDao accountDao;
  private final TimeUtil timeUtil;

  RecipeServiceImpl(RecipeDao recipeDao, AccountDao accountDao, TimeUtil timeUtil) {
    this.recipeDao = recipeDao;
    this.accountDao = accountDao;
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

  @Override
  @Transactional
  public Account addFavouriteRecipe(String email, Recipe recipe) {
    Account account = accountDao.findByEmail(email);
    if (account == null) {
      throw new IllegalArgumentException("User with email not exists: " + email);
    }
    return addNewFavouriteRecipe(account, recipe);
  }

  private Account addNewFavouriteRecipe(Account account, Recipe recipe) {
    if (alreadyFavourite(account, recipe)) {
      return account;
    }
    account.getFavouriteRecipes().add(recipe);
    account.setUpdated(timeUtil.now());
    return accountDao.save(account);
  }

  private boolean alreadyFavourite(Account account, Recipe recipe) {
    return account.getFavouriteRecipes().stream()
        .anyMatch(r -> r.getId().equals(recipe.getId()));
  }
}
