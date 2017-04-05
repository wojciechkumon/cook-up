package cookup.service.recipe;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import cookup.dao.RecipeDao;
import cookup.domain.recipe.Recipe;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RecipeFinderImplTest {

  private RecipeDao recipeDao;

  private RecipeFinderImpl recipeFinder;

  @BeforeEach
  void setUp() {
    recipeDao = mock(RecipeDao.class);
    recipeFinder = new RecipeFinderImpl(recipeDao);
  }

  @Test
  void should_return_recipes_page() {
    // given
    List<Long> ingredientIds = Arrays.asList(4L, 6L, 7L);
    List<Long> recipeIds = Collections.singletonList(17L);
    Pageable pageable = new PageRequest(0, 20);
    Page<Recipe> page = new PageImpl<>(Collections.singletonList(new Recipe()));

    when(recipeDao.findMatchingRecipeIds(ingredientIds)).thenReturn(recipeIds);
    when(recipeDao.findByIdIn(recipeIds, pageable)).thenReturn(page);

    // when
    Page<Recipe> foundPage = recipeFinder.findMatchingRecipes(ingredientIds, pageable);

    // then
    assertEquals(page, foundPage);
  }
}