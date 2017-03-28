package cookup.dao;

import org.springframework.data.repository.Repository;

import cookup.domain.recipe.comment.Comment;

public interface CommentsDao extends Repository<Comment, Long>, ReadOnlyDao<Comment, Long> {
}
