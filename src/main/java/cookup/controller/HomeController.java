package cookup.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

  @GetMapping({"/", "/about", "/me", "/addRecipe", "/editRecipe/**",
      "/login", "/recipe/**", "/user/**"})
  String home() {
    return "home";
  }
}
