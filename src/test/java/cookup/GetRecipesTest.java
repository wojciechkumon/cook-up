package cookup;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import cookup.domain.recipe.Recipe;

import static org.junit.Assert.assertEquals;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = NONE)
public class GetRecipesTest {
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
    });

    // then
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

    System.out.println(new ObjectMapper().writeValueAsString(recipes));
    assertEquals(expectedRecipes, recipes);
  }
}
