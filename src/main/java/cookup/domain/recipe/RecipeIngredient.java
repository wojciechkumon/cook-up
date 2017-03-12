package cookup.domain.recipe;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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


  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private Double amount;
    private Recipe recipe;
    private Ingredient ingredient;

    public RecipeIngredient build() {
      RecipeIngredient recipeIngredient = new RecipeIngredient();
      recipeIngredient.setAmount(amount);
      recipeIngredient.setRecipe(recipe);
      recipeIngredient.setIngredient(ingredient);

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
  }
}
