import React, {Component} from "react";
import RecipeList from "../../finder/js/RecipeList";

class MyRecipes extends Component {

  render() {
    return (
      <div>
        <h3>My recipes</h3>
        <RecipeList recipes={[]}/>
      </div>
    );
  }
}

export default MyRecipes;