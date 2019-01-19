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
import java.util.List;
import java.util.Map;

import cookup.config.Profiles;
import cookup.domain.recipe.Recipe;

import static cookup.SessionIdHelper.getHeadersWithSessionId;
import static org.junit.Assert.assertEquals;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

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
    ResponseEntity<Map> responseEntity = restTemplate.exchange(
        "/api/recipes",
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<Map>() {
        });
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
    int initialAmountOfRecipes = getNumberOfRecipes();

    // when
    restTemplate.exchange("/api/recipes/1", HttpMethod.DELETE,
        new HttpEntity<>(headersWithSessionId), String.class);

    // then
    assertEquals(initialAmountOfRecipes - 1, getNumberOfRecipes());
  }

  private int getNumberOfRecipes() {
    ResponseEntity<Map> responseEntity = restTemplate.exchange(
        "/api/recipes",
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<Map>() {
        });
    Map embedded = (Map) responseEntity.getBody().get("_embedded");
    List<?> recipes = (List<?>) embedded.get("recipes");
    return recipes.size();
  }
}
