package cookup.domain.recipe;

public class RecipeRestrictions {

  private RecipeRestrictions() {}

  public static final int RECIPE_NAME_MAX_LENGTH = 64;
  public static final int INGREDIENT_NAME_MAX_LENGTH = 32;
  public static final int UNIT_LENGTH = 16;
  public static final int DIFFICULTY_LEVEL_LENGTH = 16;
  public static final int COMMENT_MAX_LENGTH = 255;
}
