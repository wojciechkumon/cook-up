package cookup.dto;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.HashSet;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import cookup.domain.recipe.DifficultyLevel;
import cookup.domain.recipe.Recipe;
import cookup.domain.recipe.RecipeIngredient;
import cookup.domain.recipe.RecipeRestrictions;

public class RecipeDto {

  @NotBlank
  @Size(max = RecipeRestrictions.RECIPE_NAME_MAX_LENGTH)
  private String name;

  @NotBlank
  @Size(max = RecipeRestrictions.DESCRIPTION_LENGTH)
  private String cookingDescription;

  @NotNull
  private Integer cookingTimeMinutes;

  @NotNull
  private DifficultyLevel difficultyLevel;

  @NotNull
  private Integer kcal;

  @NotNull
  private Integer servings;

  @NotNull
  @NotEmpty
  private List<RecipeIngredient> ingredients;


  public RecipeDto() {}

  private RecipeDto(Builder builder) {
    setName(builder.name);
    setCookingDescription(builder.cookingDescription);
    setCookingTimeMinutes(builder.cookingTimeMinutes);
    setDifficultyLevel(builder.difficultyLevel);
    setKcal(builder.kcal);
    setServings(builder.servings);
    setIngredients(builder.ingredients);
  }

  public Recipe toRecipe() {
    Recipe recipe = new Recipe();
    recipe.setName(this.getName());
    recipe.setCookingDescription(this.getCookingDescription());
    recipe.setCookingTimeMinutes(this.getCookingTimeMinutes());
    recipe.setDifficultyLevel(this.getDifficultyLevel());
    recipe.setKcal(this.getKcal());
    recipe.setServings(this.getServings());
    recipe.setIngredients(new HashSet<>(this.getIngredients()));
    return recipe;
  }

  public void putDataToRecipe(Recipe recipe) {
    recipe.setName(this.getName());
    recipe.setCookingDescription(this.getCookingDescription());
    recipe.setCookingTimeMinutes(this.getCookingTimeMinutes());
    recipe.setDifficultyLevel(this.getDifficultyLevel());
    recipe.setKcal(this.getKcal());
    recipe.setServings(this.getServings());
    recipe.getIngredients().clear();
    recipe.getIngredients().addAll(this.getIngredients());
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

  public List<RecipeIngredient> getIngredients() {
    return ingredients;
  }

  public void setIngredients(List<RecipeIngredient> ingredients) {
    this.ingredients = ingredients;
  }

  public static final class Builder {
    private String name;
    private String cookingDescription;
    private Integer cookingTimeMinutes;
    private DifficultyLevel difficultyLevel;
    private Integer kcal;
    private Integer servings;
    private List<RecipeIngredient> ingredients;

    public Builder() {}

    public Builder name(String val) {
      name = val;
      return this;
    }

    public Builder cookingDescription(String val) {
      cookingDescription = val;
      return this;
    }

    public Builder cookingTimeMinutes(Integer val) {
      cookingTimeMinutes = val;
      return this;
    }

    public Builder difficultyLevel(DifficultyLevel val) {
      difficultyLevel = val;
      return this;
    }

    public Builder kcal(Integer val) {
      kcal = val;
      return this;
    }

    public Builder servings(Integer val) {
      servings = val;
      return this;
    }

    public Builder ingredients(List<RecipeIngredient> val) {
      ingredients = val;
      return this;
    }

    public RecipeDto build() {
      return new RecipeDto(this);
    }
  }
}
