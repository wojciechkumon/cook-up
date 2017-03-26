package cookup.config;

import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import cookup.dao.IngredientDao;
import cookup.dao.RecipeDao;
import cookup.domain.recipe.DifficultyLevel;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.IngredientUnit;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;
import cookup.domain.recipe.comment.Comment;
import cookup.dto.RegistrationDto;
import cookup.service.AccountService;
import cookup.service.recipe.RecipeService;

@Component
@Profile(Profiles.DEV)
public class RecipeDbInitializer {
  private final RecipeDao recipeDao;
  private final RecipeService recipeService;
  private final IngredientDao ingredientDao;
  private final AccountService accountService;

  RecipeDbInitializer(RecipeDao recipeDao, RecipeService recipeService,
                      IngredientDao ingredientDao, AccountService accountService) {
    this.recipeDao = recipeDao;
    this.recipeService = recipeService;
    this.ingredientDao = ingredientDao;
    this.accountService = accountService;
  }

  @EventListener(ContextRefreshedEvent.class)
  public void init() {
    recipeDao.deleteAll();
    ingredientDao.deleteAll();

    Ingredient coffee = ingredientDao.save(new Ingredient("coffee", IngredientUnit.GRAM));
    Ingredient water = ingredientDao.save(new Ingredient("water", IngredientUnit.ML));
    Ingredient milk = ingredientDao.save(new Ingredient("milk", IngredientUnit.ML));
    Ingredient soyMilk = ingredientDao.save(new Ingredient("soy milk", IngredientUnit.ML));
    Ingredient coconutMilk = ingredientDao.save(new Ingredient("coconut milk", IngredientUnit.ML));

    Recipe recipe1 = saveFirstRecipe(coffee, water, milk, soyMilk, coconutMilk);
    Recipe recipe2 = saveSecondRecipe(coffee, water);

    RegistrationDto registrationDto = new RegistrationDto();
    registrationDto.setEmail("lolek@gmail.com");
    registrationDto.setPassword("lolek");
    registrationDto.setMatchingPassword("lolek");
    accountService.addAccount(registrationDto);

    recipeService.addFavouriteRecipe("lolek@gmail.com", recipe1);
    recipeService.addFavouriteRecipe("lolek@gmail.com", recipe2);
  }

  private Recipe saveFirstRecipe(Ingredient coffee, Ingredient water, Ingredient milk,
                                 Ingredient soyMilk, Ingredient coconutMilk) {
    Recipe coffeeWithMilk = Recipe.builder()
        .name("coffee with milk")
        .cookingDescription("coffee + water + milk")
        .cookingTimeMinutes(2)
        .difficultyLevel(DifficultyLevel.MEDIUM)
        .kcal(2)
        .servings(1)
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
    return recipeService.save(coffeeWithMilk);
  }

  private Recipe saveSecondRecipe(Ingredient coffee, Ingredient water) {
    Recipe coffeeRecipe = Recipe.builder()
        .name("coffee")
        .cookingDescription("coffee + water")
        .cookingTimeMinutes(1)
        .difficultyLevel(DifficultyLevel.EASY)
        .kcal(0)
        .servings(2)
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

    Comment comment1 = new Comment.Builder()
        .content("first comment")
        .recipe(coffeeRecipe)
        .build();
    Comment comment2 = new Comment.Builder()
        .content("second comment")
        .recipe(coffeeRecipe)
        .build();

    Set<RecipeIngredient> recipeIngredientSet = new HashSet<>(
        Arrays.asList(waterRecipeIngredient, coffeeRecipeIngredient));
    coffeeRecipe.setIngredients(recipeIngredientSet);
    coffeeRecipe.setComments(Arrays.asList(comment1, comment2));
    return recipeService.save(coffeeRecipe);
  }
}
