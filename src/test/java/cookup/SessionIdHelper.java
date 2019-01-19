package cookup;

import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;

class SessionIdHelper {

  static MultiValueMap<String, String> getHeadersWithSessionId(TestRestTemplate restTemplate) {
    ResponseEntity<Map> response = sendLoginRequest(restTemplate);
    String sessionId = parseSessionIdFromSetCookie(response);
    return createHeaderWithSessionIdCookie(sessionId);
  }

  private static ResponseEntity<Map> sendLoginRequest(TestRestTemplate restTemplate) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(APPLICATION_FORM_URLENCODED);
    MultiValueMap<String, String> loginForm = new LinkedMultiValueMap<>();
    loginForm.add("username", "lolek@gmail.com");
    loginForm.add("password", "lolek");
    HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(loginForm, headers);
    return restTemplate.postForEntity("/api/login", entity, Map.class);
  }

  private static String parseSessionIdFromSetCookie(ResponseEntity<Map> response) {
    List<String> setCookie = response.getHeaders().get("Set-Cookie");
    String cookieHeaderValue = setCookie.get(0);
    Pattern setCookiePattern = Pattern.compile("SESSION=(\\S+);.*");
    Matcher matcher = setCookiePattern.matcher(cookieHeaderValue);
    if (!matcher.matches()) {
      throw new RuntimeException("Can't parse cookie: " + setCookie);
    }
    return matcher.group(1);
  }

  private static MultiValueMap<String, String> createHeaderWithSessionIdCookie(String sessionId) {
    MultiValueMap<String, String> headersWithSessionId = new LinkedMultiValueMap<>();
    headersWithSessionId.add("Cookie", "SESSION= " + sessionId);
    return headersWithSessionId;
  }
}
