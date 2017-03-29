package cookup.config;

import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import cookup.dao.AccountDao;
import cookup.dao.CommentsDao;
import cookup.dao.IngredientDao;
import cookup.dao.RecipeDao;
import cookup.domain.account.Account;
import cookup.domain.recipe.DifficultyLevel;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.IngredientUnit;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;
import cookup.domain.recipe.comment.Comment;
import cookup.dto.RegistrationDto;
import cookup.service.AccountService;
import cookup.service.comments.CommentsService;
import cookup.service.recipe.RecipeService;

@Component
@Profile(Profiles.DEV)
public class RecipeDbInitializer {
  private final RecipeDao recipeDao;
  private final RecipeService recipeService;
  private final CommentsDao commentsDao;
  private final IngredientDao ingredientDao;
  private final AccountDao accountDao;
  private final AccountService accountService;
  private final CommentsService commentsService;

  RecipeDbInitializer(RecipeDao recipeDao, RecipeService recipeService,
                      CommentsDao commentsDao, IngredientDao ingredientDao,
                      AccountDao accountDao, AccountService accountService,
                      CommentsService commentsService) {
    this.recipeDao = recipeDao;
    this.recipeService = recipeService;
    this.commentsDao = commentsDao;
    this.ingredientDao = ingredientDao;
    this.accountDao = accountDao;
    this.accountService = accountService;
    this.commentsService = commentsService;
  }

  @EventListener(ContextRefreshedEvent.class)
  public void init() {
    commentsDao.deleteAll();
    accountDao.deleteAll();
    recipeDao.deleteAll();
    ingredientDao.deleteAll();

    String email = "lolek@gmail.com";
    Account account = createAccount(email);

    Ingredient coffee = ingredientDao.save(new Ingredient("coffee", IngredientUnit.GRAM));
    Ingredient water = ingredientDao.save(new Ingredient("water", IngredientUnit.ML));
    Ingredient milk = ingredientDao.save(new Ingredient("milk", IngredientUnit.ML));
    Ingredient soyMilk = ingredientDao.save(new Ingredient("soy milk", IngredientUnit.ML));
    Ingredient coconutMilk = ingredientDao.save(new Ingredient("coconut milk", IngredientUnit.ML));

    Recipe recipe1 = saveFirstRecipe(account, coffee, water, milk, soyMilk, coconutMilk);
    Recipe recipe2 = saveSecondRecipe(account, coffee, water);

    addComments(email, account, recipe1);

    recipeService.addToFavourites(recipe1.getId(), email);
    recipeService.addToFavourites(recipe2.getId(), email);
  }

  private Account createAccount(String email) {
    RegistrationDto registrationDto = new RegistrationDto();
    registrationDto.setEmail(email);
    registrationDto.setPassword("lolek");
    registrationDto.setMatchingPassword("lolek");
    return accountService.addAccount(registrationDto);
  }

  private Recipe saveFirstRecipe(Account account, Ingredient coffee, Ingredient water, Ingredient milk,
                                 Ingredient soyMilk, Ingredient coconutMilk) {
    Recipe coffeeWithMilk = Recipe.builder()
        .name("coffee with milk")
        .cookingDescription("coffee + water + milk")
        .cookingTimeMinutes(2)
        .difficultyLevel(DifficultyLevel.MEDIUM)
        .kcal(2)
        .servings(1)
        .author(account)
        .build();

    RecipeIngredient coffeeRecipeIngredient = RecipeIngredient.builder()
        .recipe(coffeeWithMilk)
        .ingredient(coffee)
        .amount(20D)
        .build();

    RecipeIngredient waterRecipeIngredient = RecipeIngredient.builder()
        .recipe(coffeeWithMilk)
        .ingredient(water)
        .amount(200D)
        .build();

    RecipeIngredient milkRecipeIngredient = RecipeIngredient.builder()
        .recipe(coffeeWithMilk)
        .ingredient(milk)
        .amount(30D)
        .substitutes(new HashSet<>(Arrays.asList(soyMilk, coconutMilk)))
        .build();

    Set<RecipeIngredient> recipeIngredientSet = new HashSet<>(
        Arrays.asList(waterRecipeIngredient, coffeeRecipeIngredient, milkRecipeIngredient));
    coffeeWithMilk.setIngredients(recipeIngredientSet);
    return recipeService.addRecipe(coffeeWithMilk, account.getEmail());
  }

  private Recipe saveSecondRecipe(Account account, Ingredient coffee, Ingredient water) {
    Recipe coffeeRecipe = Recipe.builder()
        .name("coffee")
        .cookingDescription("coffee + water")
        .cookingTimeMinutes(1)
        .difficultyLevel(DifficultyLevel.EASY)
        .kcal(0)
        .servings(2)
        .author(account)
        .build();

    RecipeIngredient coffeeRecipeIngredient = RecipeIngredient.builder()
        .recipe(coffeeRecipe)
        .ingredient(coffee)
        .amount(40D)
        .build();

    RecipeIngredient waterRecipeIngredient = RecipeIngredient.builder()
        .recipe(coffeeRecipe)
        .ingredient(water)
        .amount(230D)
        .build();

    Set<RecipeIngredient> recipeIngredientSet = new HashSet<>(
        Arrays.asList(waterRecipeIngredient, coffeeRecipeIngredient));
    coffeeRecipe.setIngredients(recipeIngredientSet);
    return recipeService.addRecipe(coffeeRecipe, account.getEmail());
  }

  private void addComments(String email, Account account, Recipe recipe1) {
    Comment comment1 = new Comment.Builder()
        .content("first comment")
        .recipe(recipe1)
        .author(account)
        .build();
    Comment comment2 = new Comment.Builder()
        .content("second comment")
        .recipe(recipe1)
        .author(account)
        .build();
    commentsService.addUserComment(comment1, recipe1.getId(), email);
    commentsService.addUserComment(comment2, recipe1.getId(), email);
  }
}
