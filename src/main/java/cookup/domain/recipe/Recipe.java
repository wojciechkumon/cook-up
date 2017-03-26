package cookup.domain.recipe;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

import cookup.domain.recipe.comment.Comment;

@Entity
public class Recipe {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false, length = RecipeRestrictions.RECIPE_NAME_MAX_LENGTH)
  private String name;

  @Column(name = "cooking_description", nullable = false)
  @Lob
  private String cookingDescription;

  @Column(name = "cooking_time_minutes", nullable = false)
  private Integer cookingTimeMinutes;

  @Column(name = "difficulty_level", nullable = false,
      length = RecipeRestrictions.DIFFICULTY_LEVEL_LENGTH)
  @Enumerated(EnumType.STRING)
  private DifficultyLevel difficultyLevel;

  @Column(nullable = false)
  private Integer kcal;

  @Column(nullable = false)
  private Integer servings;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "recipe")
  private Set<RecipeIngredient> ingredients;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "recipe")
  private List<Comment> comments = Collections.emptyList();

  @Column(nullable = false)
  private LocalDateTime created;

  @Column(nullable = false)
  private LocalDateTime updated;


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCookingDescription() {
    return cookingDescription;
  }

  public void setCookingDescription(String cookingDescription) {
    this.cookingDescription = cookingDescription;
  }

  public Integer getCookingTimeMinutes() {
    return cookingTimeMinutes;
  }

  public void setCookingTimeMinutes(Integer cookingTimeMinutes) {
    this.cookingTimeMinutes = cookingTimeMinutes;
  }

  public DifficultyLevel getDifficultyLevel() {
    return difficultyLevel;
  }

  public void setDifficultyLevel(DifficultyLevel difficultyLevel) {
    this.difficultyLevel = difficultyLevel;
  }

  public Integer getKcal() {
    return kcal;
  }

  public void setKcal(Integer kcal) {
    this.kcal = kcal;
  }

  public Integer getServings() {
    return servings;
  }

  public void setServings(Integer servings) {
    this.servings = servings;
  }

  public Set<RecipeIngredient> getIngredients() {
    return ingredients;
  }

  public void setIngredients(Set<RecipeIngredient> ingredients) {
    this.ingredients = ingredients;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

  public LocalDateTime getCreated() {
    return created;
  }

  public void setCreated(LocalDateTime created) {
    this.created = created;
  }

  public LocalDateTime getUpdated() {
    return updated;
  }

  public void setUpdated(LocalDateTime updated) {
    this.updated = updated;
  }


  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private String name;
    private String cookingDescription;
    private Integer cookingTimeMinutes;
    private DifficultyLevel difficultyLevel;
    private Integer kcal;
    private Integer servings;
    private Set<RecipeIngredient> ingredients = Collections.emptySet();
    private List<Comment> comments = Collections.emptyList();

    public Builder name(String name) {
      this.name = name;
      return this;
    }

    public Builder cookingDescription(String cookingDescription) {
      this.cookingDescription = cookingDescription;
      return this;
    }

    public Builder cookingTimeMinutes(Integer cookingTimeMinutes) {
      this.cookingTimeMinutes = cookingTimeMinutes;
      return this;
    }

    public Builder difficultyLevel(DifficultyLevel difficultyLevel) {
      this.difficultyLevel = difficultyLevel;
      return this;
    }

    public Builder kcal(Integer kcal) {
      this.kcal = kcal;
      return this;
    }

    public Builder servings(Integer servings) {
      this.servings = servings;
      return this;
    }

    public Builder ingredients(Set<RecipeIngredient> ingredients) {
      this.ingredients = ingredients;
      return this;
    }

    public Builder comments(List<Comment> comments) {
      this.comments = comments;
      return this;
    }

    public Recipe build() {
      Recipe recipe = new Recipe();
      recipe.setName(name);
      recipe.setCookingDescription(cookingDescription);
      recipe.setCookingTimeMinutes(cookingTimeMinutes);
      recipe.setDifficultyLevel(difficultyLevel);
      recipe.setKcal(kcal);
      recipe.setServings(servings);
      return recipe;
    }
  }
}
