import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import Loader from "../../util/js/Loader";
import {
  addRecipeToFavourite,
  fetchRecipeFavourite,
  removeRecipeFromFavourite
} from "./actions/actions";
import "../style/AddToFavourites.scss";

class AddToFavourites extends Component {

  componentDidMount() {
    const {recipeId, userId} = this.props;
    this.props.dispatch(fetchRecipeFavourite(recipeId, userId));
  }

  addToFavourites = () => {
    const {recipeId} = this.props;
    this.props.dispatch(addRecipeToFavourite(recipeId));
  };

  removeFromFavourites = () => {
    const {recipeId} = this.props;
    this.props.dispatch(removeRecipeFromFavourite(recipeId));
  };

  render() {
    const {fullRecipe} = this.props;
    if (fullRecipe.isFavouriteFetching) {
      return <Loader/>;
    }

    const {isFavourite} = fullRecipe;
    return (
      <h3 className="AddToFavourites">{this.getContent(isFavourite)}</h3>
    );
  }

  getContent = isFavourite => {
    return isFavourite ?
           <span>Remove from favourites<FontAwesome onClick={this.removeFromFavourites}
                                                     className="heart-icon favourite"
                                                     name="heart"/></span> :
           <span>Add to favourites<FontAwesome onClick={this.addToFavourites}
                                                className="heart-icon"
                                                name="heart"/></span>;
  }
}

AddToFavourites.propTypes = {
  fullRecipe: PropTypes.object.isRequired,
  recipeId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    userId: state.auth.id
  }
};

AddToFavourites = connect(mapStateToProps)(AddToFavourites);

export default AddToFavourites;
