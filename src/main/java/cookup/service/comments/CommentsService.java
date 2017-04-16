package cookup.service.comments;

import java.util.List;

import cookup.domain.recipe.comment.Comment;
import cookup.dto.CommentDto;
import cookup.dto.RecipeCommentDto;

public interface CommentsService {

  Comment addAnonymousComment(CommentDto comment, long recipeId);

  Comment addUserComment(CommentDto comment, long recipeId, String email);

  List<RecipeCommentDto> getRecipeComments(long recipeId);
}
