package cookup.service.ingredients;

import java.util.List;

import cookup.domain.recipe.Ingredient;

public interface SimilarIngredientsFinder {

  /**
   * Finds similar ingredients
   *
   * @param ingredient similar ingredients of this one will be found
   * @return similar ingredients including one from parameter
   */
  List<Ingredient> find(Ingredient ingredient);
}
