package cookup.controller.rest;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import cookup.service.recipe.RecipeService;

@RestController
@BasePathAwareController
public class FavouriteRecipeRestController {
  private final RecipeService recipeService;

  FavouriteRecipeRestController(RecipeService recipeService) {
    this.recipeService = recipeService;
  }

  @GetMapping("/recipes/{recipeId}/favourite")
  void toggleFavourite(@PathVariable Long recipeId,
                       @RequestParam(defaultValue = "true") boolean add, Principal principal) {

    String userEmail = principal.getName();
    if (add) {
      recipeService.addToFavourites(recipeId, userEmail);
    } else {
      recipeService.removeFromFavourites(recipeId, userEmail);
    }
  }
}
