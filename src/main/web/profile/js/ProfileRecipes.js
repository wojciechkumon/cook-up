import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import RecipeList from "../../finder/js/RecipeList";
import Loader from "../../util/js/Loader";
import {fetchCreatedRecipesIfNeeded} from "./actions/actions";

class ProfileRecipes extends Component {

  componentDidMount() {
    const {dispatch, profileId} = this.props;
    dispatch(fetchCreatedRecipesIfNeeded(profileId));
  }

  render() {
    const {profiles, profileId, recipes} = this.props;
    const profile = profiles[profileId];

    let recipeIds = profile ? profile.createdRecipeIds : [];
    const fetching = recipeIds ? recipeIds.isFetching : false;

    recipeIds = recipeIds.data ? recipeIds.data : [];

    const recipesToRender = recipeIds.map(id => recipes[id])
      .filter(fullRecipe => fullRecipe)
      .map(recipe => recipe.data)
      .filter(recipe => recipe);

    return (
      <div>
        <h3>Created recipes</h3>
        {fetching && <Loader/>}
        <RecipeList recipes={recipesToRender}/>
      </div>
    );
  }
}

ProfileRecipes.propTypes = {
  profileId: PropTypes.number.isRequired,
  recipes: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    recipes: state.recipes.byId,
    profiles: state.profiles.byId
  }
};

ProfileRecipes = connect(mapStateToProps)(ProfileRecipes);

export default ProfileRecipes;