package cookup.service.comments;

import org.springframework.stereotype.Service;

import cookup.dao.AccountDao;
import cookup.dao.CommentsDao;
import cookup.dao.RecipeDao;
import cookup.domain.account.Account;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.comment.Comment;
import cookup.dto.CommentDto;

@Service
public class CommentsServiceImpl implements CommentsService {
  private final RecipeDao recipeDao;
  private final CommentsDao commentsDao;
  private final AccountDao accountDao;

  CommentsServiceImpl(RecipeDao recipeDao, CommentsDao commentsDao,
                      AccountDao accountDao) {
    this.recipeDao = recipeDao;
    this.commentsDao = commentsDao;
    this.accountDao = accountDao;
  }

  @Override
  public Comment addAnonymousComment(CommentDto comment, long recipeId) {
    return addComment(comment, recipeId, null);
  }

  @Override
  public Comment addUserComment(CommentDto comment, long recipeId, String email) {
    Account author = accountDao.findByEmail(email);
    if (author == null) {
      throw new IllegalArgumentException("Account not exists: " + email);
    }
    return addComment(comment, recipeId, author);
  }

  private Comment addComment(CommentDto commentDto, long recipeId, Account author) {
    Comment comment = new Comment(commentDto.getContent());
    validate(comment);
    comment.setRecipe(getRecipe(recipeId));
    comment.setAuthor(author);
    return commentsDao.save(comment);
  }

  private Recipe getRecipe(long recipeId) {
    Recipe recipe = recipeDao.findOne(recipeId);
    if (recipe == null) {
      throw new IllegalArgumentException("Recipe with id not exists: " + recipeId);
    }
    return recipe;
  }

  private void validate(Comment comment) {
    if (comment.getContent() == null) {
      throw new IllegalArgumentException("Comment content can't be empty");
    }
  }
}
