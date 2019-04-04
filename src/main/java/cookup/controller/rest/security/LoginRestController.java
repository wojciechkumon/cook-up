package cookup.controller.rest.security;

import cookup.service.AccountService;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import cookup.domain.account.UserWithId;

@RestController
@BasePathAwareController
public class LoginRestController {
  private final AccountService accountService;
  private final Map<String, String> successMap;
  private final Map<String, String> failureMap;

  LoginRestController(AccountService accountService) {
    this.accountService = accountService;
    this.successMap = prepareMap("true");
    this.failureMap = prepareMap("false");
  }

  private Map<String, String> prepareMap(String success) {
    Map<String, String> successMap = new HashMap<>(1);
    successMap.put("success", success);
    return Collections.unmodifiableMap(successMap);
  }

  @GetMapping("/loginSuccess")
  Map<String, Object> loginSuccess(Principal principal) {
    UserWithId userWithId = getUserWithId(principal);

    Map<String, Object> loginSuccessMap = new HashMap<>(successMap);
    loginSuccessMap.put("email", userWithId.getEmail());
    loginSuccessMap.put("id", accountService.getAccountId(userWithId.getEmail()));
    return loginSuccessMap;
  }

  private UserWithId getUserWithId(Principal principal) {
    UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
    return (UserWithId) token.getPrincipal();
  }

  @GetMapping("/wrongCredentials")
  Map<String, String> wrongCredentials() {
    return failureMap;
  }
}
