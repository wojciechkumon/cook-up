package cookup;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collections;
import java.util.List;

import cookup.config.Profiles;
import cookup.domain.recipe.DifficultyLevel;
import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.RecipeIngredient;
import cookup.dto.RecipeDto;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertFalse;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles(Profiles.TEST)
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = NONE)
public class SecurityTests {

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  public void shouldNotDeleteRecipe() {
    // when
    ResponseEntity<String> responseEntity = restTemplate.
        exchange("/api/recipes/1", HttpMethod.DELETE,
            HttpEntity.EMPTY, String.class);

    // then
    assertFalse(responseEntity.getStatusCode().is2xxSuccessful());
  }

  @Test
  public void shouldNotAddRecipe() {
    // given
    List<Ingredient> ingredients = restTemplate.exchange(
        "/api/ingredients", HttpMethod.GET, null,
        new ParameterizedTypeReference<List<Ingredient>>() {
        }).getBody();
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
        new HttpEntity<>(recipeDto), String.class);

    // then
    assertFalse(responseEntity.getStatusCode().is2xxSuccessful());
  }

  @Test
  public void shouldUpdateRecipe() {
    // given
    List<Ingredient> ingredients = restTemplate.exchange(
        "/api/ingredients", HttpMethod.GET, null,
        new ParameterizedTypeReference<List<Ingredient>>() {
        }).getBody();
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
        new HttpEntity<>(recipeDto), String.class);

    // then
    assertFalse(responseEntity.getStatusCode().is2xxSuccessful());
  }
}
