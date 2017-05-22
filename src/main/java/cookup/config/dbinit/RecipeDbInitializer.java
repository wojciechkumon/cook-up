package cookup.config.dbinit;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import cookup.dao.AccountDao;
import cookup.dao.CommentsDao;
import cookup.dao.IngredientDao;
import cookup.dao.RecipeDao;
import cookup.domain.account.Account;
import cookup.domain.account.UserRole;
import cookup.domain.account.UserRoleType;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.Recipe;
import cookup.dto.CommentDto;
import cookup.dto.RecipeDto;
import cookup.dto.RegistrationDto;
import cookup.service.AccountService;
import cookup.service.comments.CommentsService;
import cookup.service.recipe.RecipeService;

@Component
public class RecipeDbInitializer {
  private static final String INGREDIENTS_FILE = "data/ingredients.json";
  private static final String RECIPES_FILE = "data/recipes.json";
  private static final String EMAIL = "lolek@gmail.com";
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

  public void init() {
    clearDb();

    Account account = createAccount(EMAIL);

    Map<String, Ingredient> ingredients = putIngredientsToDb();
    List<Recipe> recipes = putRecipesToDb(account.getEmail(), ingredients);

    addComments(account.getEmail(), recipes.get(0));

    recipeService.addToFavourites(recipes.get(0).getId(), account.getEmail());
  }

  private void clearDb() {
    commentsDao.deleteAll();
    accountDao.deleteAll();
    recipeDao.deleteAll();
    ingredientDao.deleteAll();
  }

  private Account createAccount(String email) {
    RegistrationDto registrationDto = new RegistrationDto();
    registrationDto.setEmail(email);
    registrationDto.setPassword("lolek");
    registrationDto.setMatchingPassword("lolek");
    Account account = accountService.addAccount(registrationDto);
    UserRole adminRole = new UserRole(account, UserRoleType.ADMIN);
    account.getUserRoles().add(adminRole);
    return accountDao.save(account);
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

  private List<Recipe> putRecipesToDb(String email, Map<String, Ingredient> ingredients) {
    InputStream inputStream = getClass().getClassLoader()
        .getResourceAsStream(RECIPES_FILE);
    ObjectMapper mapper = new ObjectMapper();
    try {
      List<RecipeDto> recipes = Arrays.asList(mapper.readValue(inputStream, RecipeDto[].class));
      recipes.forEach(recipeDto -> setIngredientsId(recipeDto, ingredients));
      return recipes.stream()
          .map(recipeDto -> recipeService.addRecipe(recipeDto, email))
          .collect(Collectors.toList());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private void setIngredientsId(RecipeDto recipeDto, Map<String, Ingredient> ingredients) {
    recipeDto.getIngredients().forEach(recipeIngredient -> {
      setId(ingredients, recipeIngredient.getIngredient());
      recipeIngredient.getSubstitutes().forEach(substitute -> setId(ingredients, substitute));
    });
  }

  private void setId(Map<String, Ingredient> ingredients, Ingredient ingredient) {
    Ingredient ingredientFromDb = ingredients.get(ingredient.getName());
    validateIngredient(ingredient, ingredientFromDb);
    ingredient.setId(ingredientFromDb.getId());
  }

  private void validateIngredient(Ingredient ingredient, Ingredient ingredientFromDb) {
    if (ingredientFromDb == null) {
      throw new IllegalArgumentException("Ingredient not exists: " + ingredient.getName());
    } else if (ingredient.getIngredientUnit() != ingredientFromDb.getIngredientUnit()) {
      throw new IllegalArgumentException("Not correct ingredient unit="
          + ingredient.getIngredientUnit() + ", but should be "
          + ingredientFromDb.getIngredientUnit() + " for " + ingredient.getName());
    }
  }

  private void addComments(String email, Recipe recipe) {
    CommentDto comment1 = new CommentDto("first comment");
    CommentDto comment2 = new CommentDto("second comment");
    commentsService.addUserComment(comment1, recipe.getId(), email);
    commentsService.addUserComment(comment2, recipe.getId(), email);
  }
}
