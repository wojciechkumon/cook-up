package cookup.service;

import org.springframework.stereotype.Service;

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

    Ingredient milk = new Ingredient("milk", IngredientUnit.ML);
    Ingredient coffee = new Ingredient("coffee", IngredientUnit.GRAM);
    Ingredient water = new Ingredient("water", IngredientUnit.ML);

    milk = ingredientDao.save(milk);
    coffee = ingredientDao.save(coffee);
    water = ingredientDao.save(water);

    Recipe coffeeWithMilk = Recipe.builder()
        .name("coffee with milk")
        .cookingDescription("blabla")
        .cookingTimeMinutes(2)
        .kcal(2)
        .servings(1)
        .build();

    RecipeIngredient recipeIngredient1 = new RecipeIngredient();
    recipeIngredient1.setRecipe(coffeeWithMilk);
    recipeIngredient1.setIngredient(milk);
    recipeIngredient1.setAmount(30D);

    RecipeIngredient recipeIngredient2 = new RecipeIngredient();
    recipeIngredient2.setRecipe(coffeeWithMilk);
    recipeIngredient2.setIngredient(coffee);
    recipeIngredient2.setAmount(20D);

    Set<RecipeIngredient> recipeIngredientSet = new HashSet<>();
    recipeIngredientSet.add(recipeIngredient1);
    recipeIngredientSet.add(recipeIngredient2);
    coffeeWithMilk.setIngredients(recipeIngredientSet);
    recipeDao.save(coffeeWithMilk);


    Recipe coffeeRecipe = Recipe.builder()
        .name("coffee")
        .cookingDescription("blabla2")
        .cookingTimeMinutes(1)
        .kcal(0)
        .servings(2)
        .build();

    RecipeIngredient recipeIngredient3 = new RecipeIngredient();
    recipeIngredient3.setRecipe(coffeeRecipe);
    recipeIngredient3.setIngredient(water);
    recipeIngredient3.setAmount(200D);

    RecipeIngredient recipeIngredient4 = new RecipeIngredient();
    recipeIngredient4.setRecipe(coffeeRecipe);
    recipeIngredient4.setIngredient(coffee);
    recipeIngredient4.setAmount(40D);

    recipeIngredientSet = new HashSet<>();
    recipeIngredientSet.add(recipeIngredient3);
    recipeIngredientSet.add(recipeIngredient4);
    coffeeRecipe.setIngredients(recipeIngredientSet);
    recipeDao.save(coffeeRecipe);
  }
}
