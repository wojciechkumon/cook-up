import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import client from "../../restclient/client";
import {addRecipe} from "./actions/actions";

class Recipe extends Component {

  componentDidMount() {
    const recipeId = parseInt(this.props.match.params.recipeId);
    const recipes = this.props.recipes;
    if (recipes.find(r => r.id === recipeId)) {
      return;
    }

    client({method: 'GET', path: '/api/recipes/' + recipeId}).then(response => {
      this.props.dispatch(addRecipe(response.entity));
    });
  }

  render() {
    const recipeId = parseInt(this.props.match.params.recipeId);
    const recipes = this.props.recipes;
    const recipe = recipes.find(r => r.id === recipeId);

    return (
      <div>
        <br/><br/>
        {recipe && recipe.name + ', description: ' + recipe.cookingDescription}
        <br/><br/><br/><br/>
      </div>
    );
  }
}

Recipe.propTypes = {
  recipes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipeList
  }
};

Recipe = connect(mapStateToProps)(Recipe);

export default Recipe;
