package cookup.controller.rest;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import cookup.dao.IngredientDao;
import cookup.domain.recipe.Ingredient;

@RestController
@BasePathAwareController
public class IngredientsRestController {
  private final IngredientDao ingredientDao;

  IngredientsRestController(IngredientDao ingredientDao) {
    this.ingredientDao = ingredientDao;
  }

  @GetMapping("/ingredients")
  List<Ingredient> getIngredients() {
    return ingredientDao.findAll();
  }
}
