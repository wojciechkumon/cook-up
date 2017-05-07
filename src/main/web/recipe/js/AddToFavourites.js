import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import Loader from "../../util/js/Loader";
import {fetchRecipeFavourite} from "./actions/actions";
import "../style/AddToFavourites.scss";

class AddToFavourites extends Component {

  componentDidMount() {
    const {recipeId} = this.props;
    const {userId} = this.props;
    this.props.dispatch(fetchRecipeFavourite(recipeId, userId));
  }

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
           <span>Remove from favourites <FontAwesome className="heart-icon" name="heart"/></span> :
           <span>Add to favourites <FontAwesome className="heart-icon" name="heart"/></span>;
  }
}

AddToFavourites.propTypes = {
  fullRecipe: PropTypes.object.isRequired,
  recipeId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id
  }
};

AddToFavourites = connect(mapStateToProps)(AddToFavourites);

export default AddToFavourites;
