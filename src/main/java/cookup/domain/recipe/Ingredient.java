package cookup.domain.recipe;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Ingredient {

  @Id
  @GeneratedValue
  private Long id;

  @Column(unique = true, nullable = false,
      length = RecipeRestrictions.INGREDIENT_NAME_MAX_LENGTH)
  private String name;

  @Column(name = "ingredient_unit", nullable = false, length = RecipeRestrictions.UNIT_LENGTH)
  @Enumerated(EnumType.STRING)
  private IngredientUnit ingredientUnit;

  public Ingredient() {}

  public Ingredient(String name, IngredientUnit unit) {
    this.name = name;
    this.ingredientUnit = unit;
  }

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

  public IngredientUnit getIngredientUnit() {
    return ingredientUnit;
  }

  public void setIngredientUnit(IngredientUnit ingredientUnit) {
    this.ingredientUnit = ingredientUnit;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Ingredient that = (Ingredient) o;
    return Objects.equals(id, that.id)
        && Objects.equals(name, that.name)
        && Objects.equals(ingredientUnit, that.ingredientUnit);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, ingredientUnit);
  }
}
