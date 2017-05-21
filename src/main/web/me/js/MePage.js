import React, {Component} from "react";
import MyRecipes from "./MyRecipes";
import FavouriteRecipes from "./FavouriteRecipes";

class MePage extends Component {

  render() {
    return (
      <div>
        <span>It's me!</span>
        <MyRecipes/>
        <FavouriteRecipes/>
      </div>
    );
  }
}

export default MePage;