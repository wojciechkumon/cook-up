package cookup.controller.rest;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

  @PostMapping("/recipes/{recipeId}/favourite")
  void addToFavourites(@PathVariable Long recipeId, Principal principal) {
    recipeService.addToFavourites(recipeId, principal.getName());
  }

  @DeleteMapping("/recipes/{recipeId}/favourite")
  void removeFromFavourites(@PathVariable Long recipeId, Principal principal) {
    recipeService.removeFromFavourites(recipeId, principal.getName());
  }
}
