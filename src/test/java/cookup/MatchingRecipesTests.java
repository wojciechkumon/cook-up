package cookup;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Map;

import cookup.config.Profiles;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles(Profiles.TEST)
@RunWith(SpringRunner.class)
public class MatchingRecipesTests {

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  @SuppressWarnings("unchecked")
  @Ignore
  public void simpleRecipesSearch() {
    // given
    // ingredients: coffee, water
    String ingredientIds = String.join(",", "92706", "92707");

    // when
    ResponseEntity<Map> responseEntity = restTemplate.getForEntity(
        "/api/matchingRecipes?ingredients=" + ingredientIds, Map.class);

    // then
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    Map embedded = (Map) responseEntity.getBody().get("_embedded");
    List<Map> recipes = (List<Map>) embedded.get("recipes");
    assertEquals("coffee", recipes.get(0).get("name"));
  }

  @Test
  @SuppressWarnings("unchecked")
  @Ignore
  public void simpleRecipesSearch_notFoundButShouldWithExtended() {
    // given
    // ingredients: coffee, water, almond milk
    String ingredientIds = String.join(",", "92706", "92707", "92711");

    // when
    ResponseEntity<Map> responseEntity = restTemplate.getForEntity(
        "/api/matchingRecipes?ingredients=" + ingredientIds, Map.class);

    // then
    // coffee with milk not found
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    Map embedded = (Map) responseEntity.getBody().get("_embedded");
    List<Map> recipes = (List<Map>) embedded.get("recipes");
    assertEquals(1, recipes.size());
    assertEquals("coffee", recipes.get(0).get("name"));
  }

  @Test
  @SuppressWarnings("unchecked")
  @Ignore
  public void extendedRecipesSearch() {
    // given
    // ingredients: coffee, water, almond milk
    String ingredientIds = String.join(",", "92706", "92707", "92711");

    // when
    ResponseEntity<Map> responseEntity = restTemplate.getForEntity(
        "/api/matchingRecipes?ingredients=" + ingredientIds + "&useSimilar=true", Map.class);

    // then
    // coffee with milk not found
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    Map embedded = (Map) responseEntity.getBody().get("_embedded");
    List<Map> recipes = (List<Map>) embedded.get("recipes");
    assertEquals(2, recipes.size());
    assertEquals("coffee with milk", recipes.get(0).get("name"));
    assertEquals("coffee", recipes.get(1).get("name"));
  }

  @Test
  @Ignore
  public void extendedRecipesSearchNothingFound() {
    // given
    // ingredients: water, almond milk
    String ingredientIds = String.join(",", "92707", "92711");

    // when
    ResponseEntity<Map> responseEntity = restTemplate.getForEntity(
        "/api/matchingRecipes?ingredients=" + ingredientIds + "&useSimilar=true", Map.class);

    // then
    // coffee with milk not found
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    assertNull(responseEntity.getBody().get("_embedded"));
  }
}
