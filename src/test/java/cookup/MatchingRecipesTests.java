package cookup;

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
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles(Profiles.TEST)
@RunWith(SpringRunner.class)
public class MatchingRecipesTests {

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
//  @Ignore
  @SuppressWarnings("unchecked")
  public void simpleRecipesSearch() {
    // given
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
}
