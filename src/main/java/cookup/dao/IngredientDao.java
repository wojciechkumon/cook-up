package cookup.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import cookup.domain.recipe.Ingredient;

@RestResource(exported = false)
public interface IngredientDao extends JpaRepository<Ingredient, Long> {
}
