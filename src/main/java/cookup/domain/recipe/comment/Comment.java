package cookup.domain.recipe.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import cookup.domain.account.Account;
import cookup.domain.recipe.Recipe;

@Entity
public class Comment {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private String content;

  @ManyToOne
  @JoinColumn(name = "author_id")
  @JsonIgnore
  private Account author;

  @ManyToOne
  @JoinColumn(name = "recipe_id", nullable = false)
  @JsonIgnore
  private Recipe recipe;


  public Comment() {}

  private Comment(Builder builder) {
    setContent(builder.content);
    setAuthor(builder.author);
    setRecipe(builder.recipe);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Account getAuthor() {
    return author;
  }

  public void setAuthor(Account author) {
    this.author = author;
  }

  public Recipe getRecipe() {
    return recipe;
  }

  public void setRecipe(Recipe recipe) {
    this.recipe = recipe;
  }


  public static final class Builder {
    private String content;
    private Account author;
    private Recipe recipe;

    public Builder() {}

    public Builder content(String content) {
      this.content = content;
      return this;
    }

    public Builder author(Account author) {
      this.author = author;
      return this;
    }

    public Builder recipe(Recipe recipe) {
      this.recipe = recipe;
      return this;
    }

    public Comment build() {
      return new Comment(this);
    }
  }
}
