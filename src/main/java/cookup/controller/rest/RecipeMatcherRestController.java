package cookup.controller.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;

import cookup.domain.recipe.Recipe;
import cookup.service.recipe.RecipeFinder;

@RestController
@RequestMapping("/api")
public class RecipeMatcherRestController {
  private final RecipeFinder recipeFinder;

  RecipeMatcherRestController(RecipeFinder recipeFinder) {
    this.recipeFinder = recipeFinder;
  }

  @GetMapping("/matchingRecipes")
  public Collection<Recipe> addNewFavouriteRecipe(
      @RequestParam("ingredients") List<Long> ingredientIds) {

    return recipeFinder.findMatchingRecipes(ingredientIds);
  }
}
