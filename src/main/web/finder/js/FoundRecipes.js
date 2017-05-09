import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import RecipeList from "./RecipeList";
import Loader from "../../util/js/Loader";

class FoundRecipes extends Component {

  render() {
    const fetching = this.props.ids.isFetching;
    const ids = this.props.ids.data;
    const recipesToRender = ids.map(id => this.props.recipes[id])
      .filter(fullRecipe => fullRecipe)
      .map(recipe => recipe.data)
      .filter(recipe => recipe);

    if (recipesToRender.length === 0) {
      return (
        <div>
          nothing found
        </div>
      );
    }

    return (
      <div>
        {fetching && <Loader/>}
        <RecipeList recipes={recipesToRender}/>
      </div>
    );
  }
}

FoundRecipes.propTypes = {
  recipes: PropTypes.object.isRequired,
  ids: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    isFetching: PropTypes.bool,
    didInvalidate: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes.byId,
    ids: state.recipes.foundRecipeIds
  }
};

FoundRecipes = connect(mapStateToProps)(FoundRecipes);

export default FoundRecipes;
