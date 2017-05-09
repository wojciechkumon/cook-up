package cookup.domain.recipe.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
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

  @Column(nullable = false)
  private LocalDateTime created;

  @ManyToOne
  @JoinColumn(name = "author_id")
  @JsonIgnore
  private Account author;

  @ManyToOne
  @JoinColumn(name = "recipe_id", nullable = false)
  @JsonIgnore
  private Recipe recipe;


  public Comment() {}

  public Comment(String content) {
    this.content = content;
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

  public LocalDateTime getCreated() {
    return created;
  }

  public void setCreated(LocalDateTime created) {
    this.created = created;
  }
}
