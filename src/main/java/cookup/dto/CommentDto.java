package cookup.dto;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Size;

import cookup.domain.recipe.RecipeRestrictions;

public class CommentDto {

  @NotBlank
  @Size(max = RecipeRestrictions.COMMENT_MAX_LENGTH)
  private String content;

  public CommentDto() {}

  public CommentDto(String content) {
    this.content = content;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
