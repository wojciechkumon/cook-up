package cookup.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import cookup.dao.IngredientDao;
import cookup.dao.RecipeDao;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.IngredientUnit;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;

@Service
public class RecipeDbInitializer {
  private final RecipeDao recipeDao;
  private final IngredientDao ingredientDao;

  RecipeDbInitializer(RecipeDao recipeDao, IngredientDao ingredientDao) {
    this.recipeDao = recipeDao;
    this.ingredientDao = ingredientDao;
  }

  public void init() {
    recipeDao.deleteAll();
    ingredientDao.deleteAll();

    Ingredient milk = ingredientDao.save(new Ingredient("milk", IngredientUnit.ML));
    Ingredient coffee = ingredientDao.save(new Ingredient("coffee", IngredientUnit.GRAM));
    Ingredient water = ingredientDao.save(new Ingredient("water", IngredientUnit.ML));

    saveFirstRecipe(milk, coffee);
    saveSecondRecipe(coffee, water);
  }

  private void saveFirstRecipe(Ingredient milk, Ingredient coffee) {
    Recipe coffeeWithMilk = Recipe.builder()
        .name("coffee with milk")
        .cookingDescription("blabla")
        .cookingTimeMinutes(2)
        .kcal(2)
        .servings(1)
        .build();

    RecipeIngredient recipeIngredient1 = RecipeIngredient.builder()
        .recipe(coffeeWithMilk)
        .ingredient(milk)
        .amount(30D)
        .build();

    RecipeIngredient recipeIngredient2 = RecipeIngredient.builder()
        .recipe(coffeeWithMilk)
        .ingredient(coffee)
        .amount(20D)
        .build();

    Set<RecipeIngredient> recipeIngredientSet =
        new HashSet<>(Arrays.asList(recipeIngredient1, recipeIngredient2));
    coffeeWithMilk.setIngredients(recipeIngredientSet);
    recipeDao.save(coffeeWithMilk);
  }

  private void saveSecondRecipe(Ingredient coffee, Ingredient water) {
    Recipe coffeeRecipe = Recipe.builder()
        .name("coffee")
        .cookingDescription("blabla2")
        .cookingTimeMinutes(1)
        .kcal(0)
        .servings(2)
        .build();

    RecipeIngredient recipeIngredient3 = RecipeIngredient.builder()
        .recipe(coffeeRecipe)
        .ingredient(water)
        .amount(200D)
        .build();

    RecipeIngredient recipeIngredient4 = RecipeIngredient.builder()
        .recipe(coffeeRecipe)
        .ingredient(coffee)
        .amount(40D)
        .build();

    Set<RecipeIngredient> recipeIngredientSet =
        new HashSet<>(Arrays.asList(recipeIngredient3, recipeIngredient4));
    coffeeRecipe.setIngredients(recipeIngredientSet);
    recipeDao.save(coffeeRecipe);
  }
}
