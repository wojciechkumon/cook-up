package cookup;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import cookup.config.Profiles;

import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles({Profiles.TEST, Profiles.DB_MOCK})
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = NONE)
public class LoginTests {
  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  public void shouldLoginWithCorrectCredentials() {
    // given
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(APPLICATION_FORM_URLENCODED);
    MultiValueMap<String, String> loginForm = new LinkedMultiValueMap<>();
    loginForm.add("username", "lolek@gmail.com");
    loginForm.add("password", "lolek");
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(loginForm, headers);

    // when
    ResponseEntity<Map> responseEntity = restTemplate.postForEntity("/api/login", entity, Map.class);

    // then
    List<String> setCookie = responseEntity.getHeaders().get("Set-Cookie");
    String cookieHeaderValue = setCookie.get(0);
    Pattern setCookiePattern = Pattern.compile("SESSION=(\\S+);.*");
    Matcher matcher = setCookiePattern.matcher(cookieHeaderValue);
    assertTrue(matcher.matches());
  }

  @Test
  public void shouldNotLoginWithIncorrectPassword() {
    // given
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(APPLICATION_FORM_URLENCODED);
    MultiValueMap<String, String> loginForm = new LinkedMultiValueMap<>();
    loginForm.add("username", "lolek@gmail.com");
    loginForm.add("password", "WRONG_PASSWORD");
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(loginForm, headers);

    // when
    ResponseEntity<Map> responseEntity = restTemplate.postForEntity("/api/login", entity, Map.class);

    // then
    List<String> setCookie = responseEntity.getHeaders().get("Set-Cookie");
    String cookieHeaderValue = setCookie.get(0);
    Pattern setCookiePattern = Pattern.compile("SESSION=(\\S+);.*");
    Matcher matcher = setCookiePattern.matcher(cookieHeaderValue);
    assertFalse(matcher.matches());
  }
}
