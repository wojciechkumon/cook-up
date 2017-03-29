package cookup.service.comments;

import cookup.domain.recipe.comment.Comment;
import cookup.dto.CommentDto;

public interface CommentsService {

  Comment addAnonymousComment(CommentDto comment, long recipeId);

  Comment addUserComment(CommentDto comment, long recipeId, String email);
}
