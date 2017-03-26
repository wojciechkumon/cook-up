package cookup.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

import cookup.domain.recipe.Recipe;

public interface RecipeDao extends Repository<Recipe, Long>, MatchingRecipeFinder {

  List<Recipe> findAll();

  Iterable<Recipe> findAll(Iterable<Long> ids);

  Page<Recipe> findByIdIn(Iterable<Long> ids, Pageable pageable);

  Iterable<Recipe> findAll(Sort sort);

  Page<Recipe> findAll(Pageable pageable);

  Recipe findOne(Long id);

  @RestResource(exported = false)
  Recipe save(Recipe recipe);

  @RestResource(exported = false)
  void deleteAll();

  @RestResource(exported = false)
  void delete(Recipe recipe);
}
