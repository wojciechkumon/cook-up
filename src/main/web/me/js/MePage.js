import React, {Component} from "react";
import RecipeList from "../../finder/js/RecipeList";

class MePage extends Component {

  render() {
    return (
      <div>
        <span>It's me!</span>
        <div>
          <h3>My recipes</h3>
          <RecipeList recipes={[]}/>
        </div>
        <div>
          <h3>Favourite recipes</h3>
          <RecipeList recipes={[]}/>
        </div>
      </div>
    );
  }
}

export default MePage;
