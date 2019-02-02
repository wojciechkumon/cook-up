package cookup;

import com.fasterxml.jackson.core.type.TypeReference;
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

import cookup.config.Profiles;
import cookup.domain.recipe.Ingredient;

import static org.junit.Assert.assertEquals;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles({"test", "db-mock"})
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = NONE)
public class IngredientsTest {
  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  public void shouldGetIngredientsRecipe() throws IOException {
    // given
    List<String> allLines = Files.readAllLines(Paths.get(getClass().getClassLoader().getResource("ingredients.json").getPath()));
    List<Ingredient> expectedIngredients = new ObjectMapper()
        .readValue(String.join("", allLines), new TypeReference<List<Ingredient>>() {
        });

    // when
    ResponseEntity<List<Ingredient>> ingredientsEntity = restTemplate.exchange(
        "/api/ingredients", HttpMethod.GET, null,
        new ParameterizedTypeReference<List<Ingredient>>() {
        });

    // then
    assertEquals(HttpStatus.OK, ingredientsEntity.getStatusCode());
    List<Ingredient> ingredients = ingredientsEntity.getBody();
    assertEquals(expectedIngredients.size(), ingredients.size());
    for (int i = 0; i < expectedIngredients.size(); i++) {
      assertEquals(expectedIngredients.get(i).getId(), ingredients.get(i).getId());
      assertEquals(expectedIngredients.get(i).getName(), ingredients.get(i).getName());
      assertEquals(expectedIngredients.get(i).getIngredientUnit(), ingredients.get(i).getIngredientUnit());
    }
  }
}
