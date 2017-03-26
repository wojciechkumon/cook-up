package cookup.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

import cookup.domain.recipe.comment.Comment;

public interface CommentsDao extends Repository<Comment, Long> {

  List<Comment> findAll();

  Iterable<Comment> findAll(Iterable<Long> ids);

  Iterable<Comment> findAll(Sort sort);

  Page<Comment> findAll(Pageable pageable);

  Comment findOne(Long id);

  @RestResource(exported = false)
  Comment save(Comment recipe);

  @RestResource(exported = false)
  void deleteAll();

  @RestResource(exported = false)
  void delete(Comment recipe);
}
