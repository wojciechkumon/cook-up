package cookup.dto;

public class RecipeCommentDto {
  private final long id;
  private final String content;
  private final Long authorId;
  private final String authorEmail;

  public RecipeCommentDto(long id, String content, Long authorId, String authorEmail) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.authorEmail = authorEmail;
  }

  public RecipeCommentDto(long id, String content) {
    this(id, content, null, null);
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
}
