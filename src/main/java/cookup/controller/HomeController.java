package cookup.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class HomeController {
  private static final String NOT_LOGGED_IN_HOME = "loggedInHome"; // TODO create not logged in view
  private static final String LOGGED_IN_HOME = "loggedInHome";

  @GetMapping("/")
  String home(Principal principal) {
    if (principal == null) {
      return NOT_LOGGED_IN_HOME;
    }
    return LOGGED_IN_HOME;
  }

}
