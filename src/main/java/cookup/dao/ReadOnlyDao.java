package cookup.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.core.annotation.RestResource;

import java.io.Serializable;
import java.util.List;

public interface ReadOnlyDao<T, ID extends Serializable> {

  List<T> findAll();

  Iterable<T> findAll(Iterable<ID> ids);

  Iterable<T> findAll(Sort sort);

  Page<T> findAll(Pageable pageable);

  T findOne(ID id);

  @RestResource(exported = false)
  T save(T entity);

  @RestResource(exported = false)
  void deleteAll();

  @RestResource(exported = false)
  void delete(T entity);

  @RestResource(exported = false)
  void delete(ID id);
}
