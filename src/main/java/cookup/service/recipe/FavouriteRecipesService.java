package cookup.service.recipe;

public interface FavouriteRecipesService {

  void addToFavourites(long recipeId, String userEmail);

  void removeFromFavourites(long recipeId, String userEmail);
}
