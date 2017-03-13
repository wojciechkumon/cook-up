package cookup.domain.recipe;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

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

  @Column(nullable = false)
  private Integer kcal;

  @Column(nullable = false)
  private Integer servings;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "recipe")
  private Set<RecipeIngredient> ingredients;

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


  public static Builder builder() {
    return new Builder();
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

  public static class Builder {
    private String name;
    private String cookingDescription;
    private Integer cookingTimeMinutes;
    private Integer kcal;
    private Integer servings;

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

    public Builder kcal(Integer kcal) {
      this.kcal = kcal;
      return this;
    }

    public Builder servings(Integer servings) {
      this.servings = servings;
      return this;
    }

    public Recipe build() {
      Recipe recipe = new Recipe();
      recipe.setName(name);
      recipe.setCookingDescription(cookingDescription);
      recipe.setCookingTimeMinutes(cookingTimeMinutes);
      recipe.setKcal(kcal);
      recipe.setServings(servings);
      return recipe;
    }
  }
}
