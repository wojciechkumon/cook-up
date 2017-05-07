import React, {Component} from "react";
import FontAwesome from "react-fontawesome";
import "../style/AddToFavourites.scss";

class AddToFavourites extends Component {

  render() {
    return (
      <h3 className="AddToFavourites">
        Add to favourites <FontAwesome className="heart-icon" name="heart"/>
      </h3>
    );
  }
}

export default AddToFavourites;
