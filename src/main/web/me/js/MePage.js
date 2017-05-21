import React, {Component} from "react";
import MyRecipes from "./MyRecipes";
import FavouriteRecipes from "./FavouriteRecipes";

class MePage extends Component {

  render() {
    return (
      <div>
        <MyRecipes/>
        <FavouriteRecipes/>
      </div>
    );
  }
}

export default MePage;