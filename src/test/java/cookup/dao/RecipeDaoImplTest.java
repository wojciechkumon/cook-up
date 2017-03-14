package cookup.dao;

import org.junit.jupiter.api.Test;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RecipeDaoImplTest {
  private static List<Long> INGREDIENT_IDS = Arrays.asList(1L, 2L, 3L);

  private static List<BigInteger> RECIPE_BIG_INT_IDS = Arrays.asList(
      BigInteger.valueOf(13), BigInteger.valueOf(17), BigInteger.valueOf(23));

  @Test
  void shouldReturnCorrectIds() {
    // given
    EntityManager entityManager = mock(EntityManager.class);
    Query query = mock(Query.class);
    when(query.getResultList()).thenReturn(RECIPE_BIG_INT_IDS);
    when(entityManager.createNativeQuery(any())).thenReturn(query);
    RecipeDaoImpl recipeDao = new RecipeDaoImpl(entityManager);

    // when
    List<Long> matchingRecipeIds = recipeDao.findMatchingRecipeIds(INGREDIENT_IDS);

    // then
    List<Long> correctRecipeIds = RECIPE_BIG_INT_IDS.stream()
        .map(BigInteger::longValue)
        .collect(Collectors.toList());
    assertEquals(correctRecipeIds, matchingRecipeIds);
  }
}