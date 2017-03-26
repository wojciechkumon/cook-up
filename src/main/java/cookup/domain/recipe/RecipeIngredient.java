package cookup.domain.recipe;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class RecipeIngredient {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private Double amount;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "recipe_id", nullable = false)
  @JsonIgnore
  private Recipe recipe;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "ingredient_id", nullable = false)
  private Ingredient ingredient;

  @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
  @JoinTable(name = "ingredient_substitutes",
      joinColumns = @JoinColumn(name = "recipe_ingredient_id"),
      inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
  private Set<Ingredient> substitutes = new HashSet<>(0);


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  public Recipe getRecipe() {
    return recipe;
  }

  public void setRecipe(Recipe recipe) {
    this.recipe = recipe;
  }

  public Ingredient getIngredient() {
    return ingredient;
  }

  public void setIngredient(Ingredient ingredient) {
    this.ingredient = ingredient;
  }

  public Set<Ingredient> getSubstitutes() {
    return substitutes;
  }

  public void setSubstitutes(Set<Ingredient> substitutes) {
    this.substitutes = substitutes;
  }


  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private Double amount;
    private Recipe recipe;
    private Ingredient ingredient;
    private Set<Ingredient> substitutes = new HashSet<>(0);

    public RecipeIngredient build() {
      RecipeIngredient recipeIngredient = new RecipeIngredient();
      recipeIngredient.setAmount(amount);
      recipeIngredient.setRecipe(recipe);
      recipeIngredient.setIngredient(ingredient);
      recipeIngredient.setSubstitutes(substitutes);

      return recipeIngredient;
    }

    public Builder amount(Double amount) {
      this.amount = amount;
      return this;
    }

    public Builder recipe(Recipe recipe) {
      this.recipe = recipe;
      return this;
    }

    public Builder ingredient(Ingredient ingredient) {
      this.ingredient = ingredient;
      return this;
    }

    public Builder substitutes(Set<Ingredient> substitutes) {
      this.substitutes = substitutes;
      return this;
    }
  }
}
