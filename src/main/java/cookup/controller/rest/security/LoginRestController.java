package cookup.controller.rest.security;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@BasePathAwareController
public class LoginRestController {
  private final Map<String, String> successMap;
  private final Map<String, String> failureMap;

  LoginRestController() {
    this.successMap = prepareMap("true");
    this.failureMap = prepareMap("false");
  }

  private Map<String, String> prepareMap(String success) {
    Map<String, String> successMap = new HashMap<>(1);
    successMap.put("success", success);
    return Collections.unmodifiableMap(successMap);
  }

  @GetMapping("/loginSuccess")
  Map<String, String> loginSuccess() {
    return successMap;
  }

  @GetMapping("/wrongCredentials")
  Map<String, String> wrongCredentials() {
    return failureMap;
  }
}
