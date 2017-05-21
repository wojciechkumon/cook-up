import React, {Component} from "react";
import RecipeList from "../../finder/js/RecipeList";

class FavouriteRecipes extends Component {

  render() {
    return (
      <div>
        <h3>Favourite recipes</h3>
        <RecipeList recipes={[]}/>
      </div>
    );
  }
}

export default FavouriteRecipes;