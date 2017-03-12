package cookup.dao;

import org.springframework.data.repository.CrudRepository;

import cookup.domain.recipe.Ingredient;

public interface IngredientDao extends CrudRepository<Ingredient, Long> {
}
