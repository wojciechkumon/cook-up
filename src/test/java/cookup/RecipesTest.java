package cookup;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.MultiValueMap;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import cookup.config.Profiles;
import cookup.domain.recipe.DifficultyLevel;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;
import cookup.dto.RecipeDto;

import static cookup.SessionIdHelper.getHeadersWithSessionId;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles(Profiles.TEST)
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = NONE)
public class RecipesTest {
  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  @SuppressWarnings("unchecked")
  public void shouldReturnRecipesFromDb() throws IOException {
    // given
    List<String> allLines = Files.readAllLines(Paths.get(getClass().getClassLoader().getResource("recipes.json").getPath()));
    List<Recipe> expectedRecipes = new ObjectMapper()
        .readValue(String.join("", allLines), List.class);

    // when
    ResponseEntity<Map> responseEntity = restTemplate.getForEntity("/api/recipes", Map.class);
    Map embedded = (Map) responseEntity.getBody().get("_embedded");
    List<Map> recipes = (List<Map>) embedded.get("recipes");
    recipes.forEach(recipe -> {
      recipe.remove("created");
      recipe.remove("updated");
      recipe.remove("_links");
      recipe.remove("ingredients");
    });

    // then
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertEquals(expectedRecipes, recipes);
  }

  @Test
  public void shouldDeleteRecipe() {
    // given
    MultiValueMap<String, String> headersWithSessionId = getHeadersWithSessionId(restTemplate);

    // when
    restTemplate.exchange("/api/recipes/1", HttpMethod.DELETE,
        new HttpEntity<>(headersWithSessionId), String.class);

    // then
    ResponseEntity<String> entity = restTemplate.getForEntity("/api/recipes/1", String.class);
    assertEquals(NOT_FOUND, entity.getStatusCode());
  }

  @Test
  public void shouldUpdateRecipe() {
    // given
    List<Ingredient> ingredients = restTemplate.exchange(
        "/api/ingredients", HttpMethod.GET, null,
        new ParameterizedTypeReference<List<Ingredient>>() {
        }).getBody();
    MultiValueMap<String, String> headersWithSessionId = getHeadersWithSessionId(restTemplate);
    RecipeIngredient recipeIngredient = new RecipeIngredient();
    recipeIngredient.setAmount(1.0);
    recipeIngredient.setSubstitutes(Collections.emptySet());
    recipeIngredient.setIngredient(ingredients.get(0));
    RecipeDto recipeDto = new RecipeDto();
    recipeDto.setName("updated name");
    recipeDto.setCookingDescription("updated desc");
    recipeDto.setCookingTimeMinutes(1111);
    recipeDto.setDifficultyLevel(DifficultyLevel.MEDIUM);
    recipeDto.setKcal(99);
    recipeDto.setServings(999);
    recipeDto.setIngredients(singletonList(recipeIngredient));

    // when
    ResponseEntity<String> responseEntity = restTemplate.exchange("/api/recipes/2", HttpMethod.PUT,
        new HttpEntity<>(recipeDto, headersWithSessionId), String.class);

    // then
    assertEquals(NO_CONTENT, responseEntity.getStatusCode());
    Recipe updatedRecipe = restTemplate.getForObject("/api/recipes/2", Recipe.class);
    assertEquals(recipeDto.getName(), updatedRecipe.getName());
    assertEquals(recipeDto.getCookingDescription(), updatedRecipe.getCookingDescription());
    assertEquals(recipeDto.getCookingTimeMinutes(), updatedRecipe.getCookingTimeMinutes());
    assertEquals(recipeDto.getDifficultyLevel(), updatedRecipe.getDifficultyLevel());
    assertEquals(recipeDto.getKcal(), updatedRecipe.getKcal());
    assertEquals(recipeDto.getServings(), updatedRecipe.getServings());
    assertEquals(recipeDto.getIngredients().size(), updatedRecipe.getIngredients().size());
  }

  @Test
  public void shouldAddRecipe() {
    // given
    List<Ingredient> ingredients = restTemplate.exchange(
        "/api/ingredients", HttpMethod.GET, null,
        new ParameterizedTypeReference<List<Ingredient>>() {
        }).getBody();
    MultiValueMap<String, String> headersWithSessionId = getHeadersWithSessionId(restTemplate);
    RecipeIngredient recipeIngredient = new RecipeIngredient();
    recipeIngredient.setAmount(1.0);
    recipeIngredient.setSubstitutes(Collections.emptySet());
    recipeIngredient.setIngredient(ingredients.get(0));
    RecipeDto recipeDto = new RecipeDto();
    recipeDto.setName("updated name");
    recipeDto.setCookingDescription("updated desc");
    recipeDto.setCookingTimeMinutes(1111);
    recipeDto.setDifficultyLevel(DifficultyLevel.MEDIUM);
    recipeDto.setKcal(99);
    recipeDto.setServings(999);
    recipeDto.setIngredients(singletonList(recipeIngredient));

    // when
    ResponseEntity<String> responseEntity = restTemplate.exchange("/api/recipes", HttpMethod.POST,
        new HttpEntity<>(recipeDto, headersWithSessionId), String.class);

    // then
    assertEquals(CREATED, responseEntity.getStatusCode());
    Recipe createdRecipe = restTemplate.getForObject("/api/recipes/7", Recipe.class);
    assertEquals(recipeDto.getName(), createdRecipe.getName());
    assertEquals(recipeDto.getCookingDescription(), createdRecipe.getCookingDescription());
    assertEquals(recipeDto.getCookingTimeMinutes(), createdRecipe.getCookingTimeMinutes());
    assertEquals(recipeDto.getDifficultyLevel(), createdRecipe.getDifficultyLevel());
    assertEquals(recipeDto.getKcal(), createdRecipe.getKcal());
    assertEquals(recipeDto.getServings(), createdRecipe.getServings());
    assertEquals(recipeDto.getIngredients().size(), createdRecipe.getIngredients().size());
  }
}
