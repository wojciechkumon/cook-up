package cookup;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;

import cookup.config.Profiles;
import cookup.dto.RegistrationDto;

import static junit.framework.TestCase.assertEquals;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CREATED;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles({Profiles.TEST, Profiles.DB_MOCK})
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = NONE)
public class SignUpTests {
  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  public void shouldSignUp() {
    // given
    RegistrationDto registrationDto = new RegistrationDto(
        "somebody@test.com", "password", "password");

    // when
    ResponseEntity<Map> responseEntity = restTemplate.postForEntity("/api/register", registrationDto, Map.class);

    // then
    assertEquals(CREATED, responseEntity.getStatusCode());
  }

  @Test
  public void shouldNotSignUp() {
    // given
    RegistrationDto registrationDto = new RegistrationDto(
        "xxxxx@test.com", "password", "notMatchingPassword");

    // when
    ResponseEntity<Map> responseEntity = restTemplate.postForEntity("/api/register", registrationDto, Map.class);

    // then
    assertEquals(BAD_REQUEST, responseEntity.getStatusCode());
  }
}
