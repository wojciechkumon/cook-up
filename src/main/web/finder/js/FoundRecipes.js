import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import RecipeList from "./RecipeList";

class FoundRecipes extends Component {

  render() {
    const {ids} = this.props;
    const recipesToRender = ids.map(id => this.props.recipes[id])
      .filter(recipe => recipe);

    if (recipesToRender.length === 0) {
      return <div/>;
    }

    return (
      <div>
        <RecipeList recipes={recipesToRender}/>
      </div>
    );
  }
}

FoundRecipes.propTypes = {
  recipes: PropTypes.object.isRequired,
  ids: PropTypes.arrayOf(PropTypes.number).isRequired
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.byId,
    ids: state.recipes.foundRecipeIds
  }
};

FoundRecipes = connect(mapStateToProps)(FoundRecipes);

export default FoundRecipes;
