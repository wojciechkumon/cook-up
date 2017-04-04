package cookup.config;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import cookup.dao.AccountDao;
import cookup.dao.CommentsDao;
import cookup.dao.IngredientDao;
import cookup.dao.RecipeDao;
import cookup.domain.account.Account;
import cookup.domain.recipe.DifficultyLevel;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;
import cookup.dto.CommentDto;
import cookup.dto.RecipeDto;
import cookup.dto.RegistrationDto;
import cookup.service.AccountService;
import cookup.service.comments.CommentsService;
import cookup.service.recipe.RecipeService;

@Component
@Profile(Profiles.DEV)
public class RecipeDbInitializer {
  private static final String INGREDIENTS_FILE = "data/ingredients.json";
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

    Map<String, Ingredient> ingredients = putIngredientsToDb();
    Ingredient coffee = ingredients.get("coffee");
    Ingredient water = ingredients.get("water");
    Ingredient milk = ingredients.get("milk");
    Ingredient soyMilk = ingredients.get("soy milk");
    Ingredient coconutMilk = ingredients.get("coconut milk");

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

  private Map<String, Ingredient> putIngredientsToDb() {
    InputStream inputStream = getClass().getClassLoader()
        .getResourceAsStream(INGREDIENTS_FILE);
    ObjectMapper mapper = new ObjectMapper();
    try {
      Ingredient[] ingredients = mapper.readValue(inputStream, Ingredient[].class);
      List<Ingredient> savedIngredients = ingredientDao.save(Arrays.asList(ingredients));
      return savedIngredients.stream()
          .collect(Collectors.toMap(Ingredient::getName, ingredient -> ingredient));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private Recipe saveFirstRecipe(Account account, Ingredient coffee, Ingredient water, Ingredient milk,
                                 Ingredient soyMilk, Ingredient coconutMilk) {
    RecipeDto coffeeWithMilk = new RecipeDto.Builder()
        .name("coffee with milk")
        .cookingDescription("coffee + water + milk")
        .cookingTimeMinutes(2)
        .difficultyLevel(DifficultyLevel.MEDIUM)
        .kcal(2)
        .servings(1)
        .build();

    RecipeIngredient coffeeRecipeIngredient = RecipeIngredient.builder()
        .ingredient(coffee)
        .amount(20D)
        .build();

    RecipeIngredient waterRecipeIngredient = RecipeIngredient.builder()
        .ingredient(water)
        .amount(200D)
        .build();

    RecipeIngredient milkRecipeIngredient = RecipeIngredient.builder()
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
    RecipeDto coffeeRecipe = new RecipeDto.Builder()
        .name("coffee")
        .cookingDescription("coffee + water")
        .cookingTimeMinutes(1)
        .difficultyLevel(DifficultyLevel.EASY)
        .kcal(0)
        .servings(2)
        .build();

    RecipeIngredient coffeeRecipeIngredient = RecipeIngredient.builder()
        .ingredient(coffee)
        .amount(40D)
        .build();

    RecipeIngredient waterRecipeIngredient = RecipeIngredient.builder()
        .ingredient(water)
        .amount(230D)
        .build();

    Set<RecipeIngredient> recipeIngredientSet = new HashSet<>(
        Arrays.asList(waterRecipeIngredient, coffeeRecipeIngredient));
    coffeeRecipe.setIngredients(recipeIngredientSet);
    return recipeService.addRecipe(coffeeRecipe, account.getEmail());
  }

  private void addComments(String email, Account account, Recipe recipe1) {
    CommentDto comment1 = new CommentDto("first comment");
    CommentDto comment2 = new CommentDto("second comment");
    commentsService.addUserComment(comment1, recipe1.getId(), email);
    commentsService.addUserComment(comment2, recipe1.getId(), email);
  }
}
