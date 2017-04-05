package cookup.controller.rest;

import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

import javax.validation.Valid;

import cookup.config.RestConfig;
import cookup.domain.recipe.comment.Comment;
import cookup.dto.CommentDto;
import cookup.service.comments.CommentsService;

@RestController
@RequestMapping(RestConfig.API_BASE_PATH)
public class CommentsRestController {
  private final CommentsService commentsService;

  CommentsRestController(CommentsService commentsService) {
    this.commentsService = commentsService;
  }

  @PostMapping("/recipes/{recipeId}/comments")
  @ResponseStatus(HttpStatus.CREATED)
  PersistentEntityResource addComment(@PathVariable Long recipeId,
                                      @Valid @RequestBody CommentDto comment,
                                      PersistentEntityResourceAssembler resourceAssembler,
                                      Principal principal) {

    Comment savedComment = saveComment(comment, recipeId, principal);
    return resourceAssembler.toResource(savedComment);
  }

  private Comment saveComment(CommentDto comment, Long recipeId, Principal principal) {
    if (principal != null) {
      return commentsService.addUserComment(comment, recipeId, principal.getName());
    }
    return commentsService.addAnonymousComment(comment, recipeId);
  }
}
