import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import RecipeList from "./RecipeList";
import Loader from "../../util/js/Loader";
import "../style/FoundRecipes.scss";

class FoundRecipes extends Component {

  render() {
    const fetching = this.props.ids.isFetching;
    const {afterSearch} = this.props.ids;
    const ids = this.props.ids.data;
    const recipesToRender = ids.map(id => this.props.recipes[id])
      .filter(fullRecipe => fullRecipe)
      .map(recipe => recipe.data)
      .filter(recipe => recipe);

    if (!afterSearch) {
      return (<div className="nothing-found-label"/>);
    }

    if (recipesToRender.length === 0) {
      return (
        <div className="nothing-found-label">
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
    afterSearch: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool
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
