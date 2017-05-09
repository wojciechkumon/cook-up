package cookup.dto;

import java.time.LocalDateTime;

public class RecipeCommentDto {
  private final long id;
  private final String content;
  private final Long authorId;
  private final String authorEmail;
  private final LocalDateTime created;

  public RecipeCommentDto(long id, String content, Long authorId, String authorEmail,
                          LocalDateTime created) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.authorEmail = authorEmail;
    this.created = created;
  }

  public RecipeCommentDto(long id, String content, LocalDateTime created) {
    this(id, content, null, null, created);
  }

  public long getId() {
    return id;
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

  public LocalDateTime getCreated() {
    return created;
  }
}
