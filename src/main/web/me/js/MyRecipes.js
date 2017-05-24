import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import RecipeList from "../../finder/js/RecipeList";
import Loader from "../../util/js/Loader";
import {fetchCreatedRecipesIfNeeded} from "./actions/actions";

class MyRecipes extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCreatedRecipesIfNeeded());
  }

  render() {
    const fetching = this.props.ids.isFetching;
    const ids = this.props.ids.data;
    const recipesToRender = ids.map(id => this.props.recipes[id])
      .filter(fullRecipe => fullRecipe)
      .map(recipe => recipe.data)
      .filter(recipe => recipe);

    return (
      <div>
        <h3>My recipes</h3>
        {fetching && <Loader/>}
        <RecipeList recipes={recipesToRender}/>
      </div>
    );
  }
}

MyRecipes.propTypes = {
  recipes: PropTypes.object.isRequired,
  ids: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    isFetching: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes.byId,
    ids: state.me.createdRecipeIds
  }
};

MyRecipes = connect(mapStateToProps)(MyRecipes);

export default MyRecipes;