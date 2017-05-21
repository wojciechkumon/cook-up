package cookup.controller.rest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import cookup.domain.recipe.Recipe;
import cookup.service.recipe.RecipeFinder;

@RestController
@BasePathAwareController
public class RecipeMatcherRestController {
  private final RecipeFinder recipeFinder;
  private final PagedResourcesAssembler pagedResourcesAssembler;

  RecipeMatcherRestController(RecipeFinder recipeFinder,
                              PagedResourcesAssembler pagedResourcesAssembler) {
    this.recipeFinder = recipeFinder;
    this.pagedResourcesAssembler = pagedResourcesAssembler;
  }

  @GetMapping("/matchingRecipes")
  @ResponseBody
  @SuppressWarnings("unchecked")
  PagedResources<PersistentEntityResource> getMatchingRecipes(
      @RequestParam("ingredients") List<Long> ingredientIds,
      @RequestParam(defaultValue = "false") boolean useSimilar,
      PersistentEntityResourceAssembler resourceAssembler, Pageable pageable) {

    Page<Recipe> page = getRecipes(ingredientIds, pageable, useSimilar);
    return pagedResourcesAssembler.toResource(page, resourceAssembler);
  }

  private Page<Recipe> getRecipes(List<Long> ingredientIds, Pageable pageable, boolean useSimilar) {
    if (useSimilar) {
      return recipeFinder.findMatchingRecipesWithSimilarIngredients(ingredientIds, pageable);
    }
    return recipeFinder.findMatchingRecipes(ingredientIds, pageable);
  }
}
