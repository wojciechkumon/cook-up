package cookup.controller.rest;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import cookup.domain.recipe.Recipe;
import cookup.service.recipe.RecipeService;

@RestController
@BasePathAwareController
public class RecipeRestController {
  private final RecipeService recipeService;

  RecipeRestController(RecipeService recipeService) {
    this.recipeService = recipeService;
  }

  @PostMapping("/recipes")
  @ResponseStatus(HttpStatus.CREATED)
  PersistentEntityResource createRecipe(@RequestBody Recipe recipe,
                                        PersistentEntityResourceAssembler resourceAssembler,
                                        Principal principal) {
    Recipe createdRecipe = recipeService.addRecipe(recipe, principal.getName());
    return resourceAssembler.toResource(createdRecipe);
  }
}
