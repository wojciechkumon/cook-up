package cookup.service.recipe;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Set;

import cookup.dao.AccountDao;
import cookup.dao.RecipeDao;
import cookup.domain.account.Account;
import cookup.domain.recipe.Recipe;

@Service
public class FavouriteRecipesServiceImpl implements FavouriteRecipesService {
  private final AccountDao accountDao;
  private final RecipeDao recipeDao;

  FavouriteRecipesServiceImpl(AccountDao accountDao, RecipeDao recipeDao) {
    this.accountDao = accountDao;
    this.recipeDao = recipeDao;
  }

  @Override
  @Transactional
  public void addToFavourites(long recipeId, String userEmail) {
    Recipe recipe = getRecipe(recipeId);
    Account account = getAccount(userEmail);

    Set<Recipe> favouriteRecipes = account.getFavouriteRecipes();
    if (recipeNotPresentInFavourites(recipe, favouriteRecipes)) {
      favouriteRecipes.add(recipe);
      accountDao.save(account);
    }
  }

  @Override
  @Transactional
  public void removeFromFavourites(long recipeId, String userEmail) {
    Recipe recipe = getRecipe(recipeId);
    Account account = getAccount(userEmail);

    Set<Recipe> favouriteRecipes = account.getFavouriteRecipes();
    favouriteRecipes.removeIf(r -> recipe.getId().equals(r.getId()));
    accountDao.save(account);
  }

  private boolean recipeNotPresentInFavourites(Recipe recipe, Set<Recipe> favouriteRecipes) {
    return favouriteRecipes.stream().noneMatch(r -> recipe.getId().equals(r.getId()));
  }

  private Recipe getRecipe(long recipeId) {
    Recipe recipe = recipeDao.findOne(recipeId);
    Objects.requireNonNull(recipe, "Recipe not found, id=" + recipeId);
    return recipe;
  }

  private Account getAccount(String userEmail) {
    Account account = accountDao.findByEmail(userEmail);
    Objects.requireNonNull(account, "Account not found, email=" + userEmail);
    return account;
  }
}
