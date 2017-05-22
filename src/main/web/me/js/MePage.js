import React, {Component} from "react";
import MyRecipes from "./MyRecipes";
import FavouriteRecipes from "./FavouriteRecipes";
import "./style/MePage.scss";

class MePage extends Component {

  render() {
    return (
      <div className="MePage">
        <MyRecipes/>
        <FavouriteRecipes/>
      </div>
    );
  }
}

export default MePage;