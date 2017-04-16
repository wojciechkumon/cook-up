package cookup.dto;

import com.fasterxml.jackson.annotation.JsonRootName;

public class RecipeCommentDto {
  private final String content;
  private final Long authorId;
  private final String authorEmail;

  public RecipeCommentDto(String content, Long authorId, String authorEmail) {
    this.content = content;
    this.authorId = authorId;
    this.authorEmail = authorEmail;
  }

  public RecipeCommentDto(String content) {
    this(content, null, null);
  }

  public String getContent() {
    return content;
  }

  public Long getAuthorId() {
    return authorId;
  }

  public String getAuthorEmail() {
    return authorEmail;
  }
}
