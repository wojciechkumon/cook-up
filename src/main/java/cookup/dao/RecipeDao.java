package cookup.dao;

import org.springframework.data.repository.CrudRepository;

import cookup.domain.recipe.Recipe;

public interface RecipeDao extends CrudRepository<Recipe, Long> {
}
