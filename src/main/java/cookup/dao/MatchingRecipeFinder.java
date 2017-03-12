package cookup.dao;

import java.util.List;

public interface MatchingRecipeFinder {

  List<Long> findMatchingRecipeIds(List<Long> ids);
}
