package cookup.service.comments;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import cookup.dao.AccountDao;
import cookup.dao.CommentsDao;
import cookup.dao.RecipeDao;
import cookup.domain.account.Account;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.comment.Comment;
import cookup.dto.CommentDto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.only;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CommentsServiceImplTest {

  private RecipeDao recipeDao;
  private CommentsDao commentsDao;
  private AccountDao accountDao;

  private CommentsServiceImpl commentsService;

  @BeforeEach
  void setUp() {
    recipeDao = mock(RecipeDao.class);
    commentsDao = mock(CommentsDao.class);
    accountDao = mock(AccountDao.class);

    commentsService = new CommentsServiceImpl(recipeDao, commentsDao, accountDao);
  }

  @Test
  void should_add_anonymous_comment() {
    // given
    Recipe recipe = new Recipe();
    recipe.setId(5L);
    when(recipeDao.findOne(recipe.getId())).thenReturn(recipe);
    CommentDto commentDto = new CommentDto("new comment :)");
    when(commentsDao.save(any())).then(invocation -> {
      Comment argComment = (Comment) invocation.getArguments()[0];
      argComment.setId(9L);
      return argComment;
    });

    // when
    Comment comment = commentsService.addAnonymousComment(commentDto, recipe.getId());

    // then
    assertTrue(recipe == comment.getRecipe());
    assertNull(comment.getAuthor());
    assertEquals(commentDto.getContent(), comment.getContent());
    assertEquals(9L, (long) comment.getId());
    verify(commentsDao, only()).save(any());
  }

  @Test
  void should_throw_excpetion_on_adding_anonymous_comment_to_not_existing_recipe() {
    // given
    when(recipeDao.findOne(any())).thenReturn(null);
    CommentDto commentDto = new CommentDto("new comment :)");

    // then
    assertThrows(IllegalArgumentException.class,
        () -> commentsService.addAnonymousComment(commentDto, 5));
  }


  @Test
  void should_add_user_comment() {
    // given
    Recipe recipe = new Recipe();
    recipe.setId(5L);
    when(recipeDao.findOne(recipe.getId())).thenReturn(recipe);
    CommentDto commentDto = new CommentDto("new comment :)");
    when(commentsDao.save(any())).then(invocation -> {
      Comment argComment = (Comment) invocation.getArguments()[0];
      argComment.setId(9L);
      return argComment;
    });
    Account account = new Account();
    account.setEmail("email@email.com");
    when(accountDao.findByEmail(account.getEmail())).thenReturn(account);

    // when
    Comment comment =
        commentsService.addUserComment(commentDto, recipe.getId(), account.getEmail());

    // then
    assertTrue(recipe == comment.getRecipe());
    assertTrue(comment.getAuthor() == account);
    assertEquals(commentDto.getContent(), comment.getContent());
    assertEquals(9L, (long) comment.getId());
    verify(commentsDao, only()).save(any());
  }

  @Test
  void should_throw_excpetion_on_adding_user_comment_to_not_existing_recipe() {
    // given
    when(recipeDao.findOne(any())).thenReturn(null);
    CommentDto commentDto = new CommentDto("new comment :)");

    // then
    assertThrows(IllegalArgumentException.class,
        () -> commentsService.addUserComment(commentDto, 5, "any@email.com"));
  }
}