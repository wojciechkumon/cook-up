package cookup.service.comments;

import cookup.domain.recipe.comment.Comment;

public interface CommentsService {

  Comment addAnonymousComment(Comment comment, long recipeId);

  Comment addUserComment(Comment comment, long recipeId, String email);
}
