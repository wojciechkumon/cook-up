package cookup.controller.rest;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import cookup.dto.CommentDto;
import cookup.dto.RecipeCommentDto;
import cookup.service.comments.CommentsService;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RepositoryRestController
public class CommentsRestController {
  private final CommentsService commentsService;

  CommentsRestController(CommentsService commentsService) {
    this.commentsService = commentsService;
  }

  @PostMapping("/recipes/{recipeId}/comments")
  @ResponseStatus(HttpStatus.CREATED)
  void addComment(@PathVariable Long recipeId,
                  @Valid @RequestBody CommentDto comment, Principal principal) {
    if (principal != null) {
      commentsService.addUserComment(comment, recipeId, principal.getName());
    }
    commentsService.addAnonymousComment(comment, recipeId);
  }

  @GetMapping("/recipes/{recipeId}/comments")
  ResponseEntity<?> getComments(@PathVariable Long recipeId) {
    List<RecipeCommentDto> recipeComments = commentsService.getRecipeComments(recipeId);

    Resources<RecipeCommentDto> resources = new Resources<>(recipeComments);
    resources.add(linkTo(methodOn(CommentsRestController.class).getComments(recipeId))
        .withSelfRel());
    return ResponseEntity.ok(resources);
  }
}
