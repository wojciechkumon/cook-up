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
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.IngredientUnit;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;
import cookup.service.recipe.RecipeService;

@Component
@Profile(Profiles.DEV)
public class RecipeDbInitializer {
  private final RecipeDao recipeDao;
  private final RecipeService recipeService;
  private final IngredientDao ingredientDao;

  RecipeDbInitializer(RecipeDao recipeDao, RecipeService recipeService,
                      IngredientDao ingredientDao) {
    this.recipeDao = recipeDao;
    this.recipeService = recipeService;
    this.ingredientDao = ingredientDao;
  }

  @EventListener(ContextRefreshedEvent.class)
  public void init() {
    recipeDao.deleteAll();
    ingredientDao.deleteAll();

    Ingredient coffee = ingredientDao.save(new Ingredient("kawa", IngredientUnit.GRAM));
    Ingredient water = ingredientDao.save(new Ingredient("woda", IngredientUnit.ML));
    Ingredient milk = ingredientDao.save(new Ingredient("mleko", IngredientUnit.ML));

    saveFirstRecipe(coffee, water, milk);
    saveSecondRecipe(coffee, water);
  }

  private void saveFirstRecipe(Ingredient coffee, Ingredient water, Ingredient milk) {
    Recipe coffeeWithMilk = Recipe.builder()
        .name("kawa z mlekiem")
        .cookingDescription("kawa + woda + mleko")
        .cookingTimeMinutes(2)
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
        .build();


    Set<RecipeIngredient> recipeIngredientSet = new HashSet<>(
        Arrays.asList(waterRecipeIngredient, coffeeRecipeIngredient, milkRecipeIngredient));
    coffeeWithMilk.setIngredients(recipeIngredientSet);
    recipeService.save(coffeeWithMilk);
  }

  private void saveSecondRecipe(Ingredient coffee, Ingredient water) {
    Recipe coffeeRecipe = Recipe.builder()
        .name("kawa")
        .cookingDescription("kawa + woda")
        .cookingTimeMinutes(1)
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

    Set<RecipeIngredient> recipeIngredientSet = new HashSet<>(
        Arrays.asList(waterRecipeIngredient, coffeeRecipeIngredient));
    coffeeRecipe.setIngredients(recipeIngredientSet);
    recipeService.save(coffeeRecipe);
  }
}
