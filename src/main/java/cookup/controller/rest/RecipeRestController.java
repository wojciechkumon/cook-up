package cookup.controller.rest;

import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.security.Principal;

import javax.validation.Valid;

import cookup.domain.recipe.Recipe;
import cookup.dto.RecipeDto;
import cookup.service.recipe.RecipeService;

@RepositoryRestController
public class RecipeRestController {
  private final RecipeService recipeService;

  RecipeRestController(RecipeService recipeService) {
    this.recipeService = recipeService;
  }

  @PostMapping("/recipes")
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  PersistentEntityResource createRecipe(@Valid @RequestBody RecipeDto recipeDto,
                                        PersistentEntityResourceAssembler resourceAssembler,
                                        Principal principal) {
    Recipe createdRecipe = recipeService.addRecipe(recipeDto, principal.getName());
    return resourceAssembler.toResource(createdRecipe);
  }

  @PutMapping("/recipes/{recipeId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @ResponseBody
  void updateRecipe(@Valid @RequestBody RecipeDto recipeDto,
                    @PathVariable long recipeId, Principal principal) {
    recipeService.updateRecipe(recipeId, recipeDto, principal.getName());
  }
}
