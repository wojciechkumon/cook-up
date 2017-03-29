package cookup.controller.rest;

import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import cookup.domain.recipe.comment.Comment;
import cookup.service.comments.CommentsService;

@RestController
@BasePathAwareController
public class CommentsRestController {
  private final CommentsService commentsService;

  CommentsRestController(CommentsService commentsService) {
    this.commentsService = commentsService;
  }

  @PostMapping("/recipes/{recipeId}/comments")
  PersistentEntityResource addComment(@PathVariable Long recipeId, @RequestBody Comment comment,
                                      PersistentEntityResourceAssembler resourceAssembler,
                                      Principal principal) {

    Comment savedComment = saveComment(comment, recipeId, principal);
    return resourceAssembler.toResource(savedComment);
  }

  private Comment saveComment(Comment comment, Long recipeId, Principal principal) {
    if (principal != null) {
      return commentsService.addUserComment(comment, recipeId, principal.getName());
    }
    return commentsService.addAnonymousComment(comment, recipeId);
  }
}
