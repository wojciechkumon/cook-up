package cookup.dao;

import java.math.BigInteger;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public class RecipeDaoImpl implements MatchingRecipeFinder {
  private static final String queryLeft =
      "select r1.id from recipe r1 where array(" +
          "select ri.ingredient_id from recipe r2 " +
          "join recipe_ingredient ri on (r2.id=ri.recipe_id) " +
          "where r1.id=r2.id) <@ array[";

  private static final String queryRight = "]\\:\\:bigint[]";

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  @SuppressWarnings("unchecked")
  public List<Long> findMatchingRecipeIds(List<Long> ids) {
    String query = buildQuery(ids);

    Query nativeQuery = entityManager.createNativeQuery(query);

    List<BigInteger> bigIntegers = nativeQuery.getResultList();
    return bigIntegers.stream()
        .map(BigInteger::longValue)
        .collect(Collectors.toList());
  }

  private String buildQuery(List<Long> ids) {
    String paramsString = ids.stream()
        .filter(Objects::nonNull)
        .filter(id -> id.getClass().equals(Long.class))
        .map(Object::toString)
        .collect(Collectors.joining(","));

    return queryLeft + paramsString + queryRight;
  }
}