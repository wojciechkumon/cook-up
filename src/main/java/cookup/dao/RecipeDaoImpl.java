package cookup.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigInteger;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

public class RecipeDaoImpl implements MatchingRecipeFinder {
  private final String matchingRecipesSql;

  @PersistenceContext
  private EntityManager entityManager;

  @Autowired
  RecipeDaoImpl(@Value("${props.sql.matchingRecipes}") String matchingRecipesSql) {
    this.matchingRecipesSql = matchingRecipesSql;
  }

  RecipeDaoImpl(@Value("${props.sql.matchingRecipes}") String matchingRecipesSql,
                EntityManager entityManager) {
    this.matchingRecipesSql = matchingRecipesSql;
    this.entityManager = entityManager;
  }

  @Override
  public List<Long> findMatchingRecipeIds(List<Long> ids) {
    String query = buildQuery(ids);

    return getRecipeIds(query);
  }

  private List<Long> getRecipeIds(String query) {
    List<BigInteger> bigIntegers = readFromDao(query);

    return bigIntegers.stream()
        .map(BigInteger::longValue)
        .collect(Collectors.toList());
  }

  @SuppressWarnings("unchecked")
  private List<BigInteger> readFromDao(String query) {
    Query nativeQuery = entityManager.createNativeQuery(query);
    return (List<BigInteger>) nativeQuery.getResultList();
  }

  private String buildQuery(List<Long> ids) {
    String paramsString = ids.stream()
        .filter(Objects::nonNull)
        .filter(id -> id.getClass().equals(Long.class))
        .map(Object::toString)
        .collect(Collectors.joining(","));

    return String.format(matchingRecipesSql, paramsString);
  }
}
