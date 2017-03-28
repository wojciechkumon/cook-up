package cookup.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import cookup.domain.recipe.Recipe;

public interface RecipeDao extends Repository<Recipe, Long>, ReadOnlyDao<Recipe, Long>,
    MatchingRecipeFinder {

  Page<Recipe> findByIdIn(Iterable<Long> ids, Pageable pageable);
}
