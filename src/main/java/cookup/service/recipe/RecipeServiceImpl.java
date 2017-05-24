package cookup.service.recipe;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

import cookup.dao.AccountDao;
import cookup.dao.IngredientDao;
import cookup.dao.RecipeDao;
import cookup.domain.account.Account;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;
import cookup.dto.RecipeDto;
import cookup.service.util.TimeUtil;

@Service
public class RecipeServiceImpl implements RecipeService {
  private final RecipeDao recipeDao;
  private final AccountDao accountDao;
  private final IngredientDao ingredientDao;
  private final TimeUtil timeUtil;

  RecipeServiceImpl(RecipeDao recipeDao, AccountDao accountDao,
                    IngredientDao ingredientDao, TimeUtil timeUtil) {
    this.recipeDao = recipeDao;
    this.accountDao = accountDao;
    this.ingredientDao = ingredientDao;
    this.timeUtil = timeUtil;
  }

  @Override
  @Transactional
  public Recipe addRecipe(RecipeDto recipeDto, String userEmail) {
    Recipe recipe = recipeDto.toRecipe();
    recipe.getIngredients().forEach(this::validateRecipeIngredient);
    setIngredientsReferences(recipe);

    recipe.setAuthor(getAccount(userEmail));
    LocalDateTime now = timeUtil.now();
    recipe.setCreated(now);
    recipe.setUpdated(now);
    return recipeDao.save(recipe);
  }

  private void validateRecipeIngredient(RecipeIngredient recipeIngredient) {
    if (recipeIngredient.getSubstitutes() != null) {
      recipeIngredient.getSubstitutes().forEach(this::validateIngredient);
    }
    Objects.requireNonNull(recipeIngredient.getAmount());
    this.validateIngredient(recipeIngredient.getIngredient());

    if (recipeIngredient.getSubstitutes() != null) {
      recipeIngredient.getSubstitutes()
          .removeIf(substitute ->
              recipeIngredient.getIngredient().getId().equals(substitute.getId()));
    }
  }

  private void validateIngredient(Ingredient ingredient) {
    Objects.requireNonNull(ingredient);
    Objects.requireNonNull(ingredient.getId());
    Ingredient ingredientFromDao = ingredientDao.getOne(ingredient.getId());
    if (ingredientFromDao.getIngredientUnit() != ingredient.getIngredientUnit()
        || !ingredientFromDao.getName().equals(ingredient.getName())) {
      throw new IllegalArgumentException("Ingredient not recognized: "
          + ingredient.getName() + ", " + ingredient.getIngredientUnit());
    }
  }

  private void setIngredientsReferences(Recipe recipe) {
    recipe.getIngredients()
        .forEach(ingredient -> ingredient.setRecipe(recipe));
  }

  @Override
  @Transactional
  public Recipe updateRecipe(Long recipeId, RecipeDto recipeDto, String userEmail) {
    Recipe recipeToUpdate = getRecipe(recipeId);
    checkOwnership(userEmail, recipeToUpdate);
    recipeDto.getIngredients()
        .forEach(this::validateRecipeIngredient);

    recipeDto.putDataToRecipe(recipeToUpdate);
    setIngredientsReferences(recipeToUpdate);

    LocalDateTime now = timeUtil.now();
    recipeToUpdate.setUpdated(now);
    return recipeDao.save(recipeToUpdate);
  }

  private void checkOwnership(String userEmail, Recipe recipe) {
    if (!userEmail.equalsIgnoreCase(recipe.getAuthor().getEmail())) {
      throw new IllegalArgumentException("User " + userEmail
          + " is not owner of recipe with id " + recipe.getId());
    }
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

  @Override
  @Transactional
  public void deleteRecipe(long recipeId, String userEmail) {
    Recipe recipe = getRecipe(recipeId);
    checkOwnership(userEmail, recipe);
    Set<Account> recipeLovers = recipe.getRecipeLovers();
    recipeLovers.forEach(account ->
        account.getFavouriteRecipes()
            .removeIf(r -> r.getId() == recipeId));
    recipeLovers.clear();
    recipeDao.delete(recipe);
  }

  private boolean recipeNotPresentInFavourites(Recipe recipe, Set<Recipe> favouriteRecipes) {
    return favouriteRecipes.stream()
        .noneMatch(r -> recipe.getId().equals(r.getId()));
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
