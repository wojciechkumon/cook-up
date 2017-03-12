package cookup.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import cookup.service.RecipeDbInitializer;

@Controller
public class HomeController {

  HomeController(RecipeDbInitializer initializer) {
    initializer.init();
  }

  @GetMapping("/")
  String home() {
    return "home";
  }
}
