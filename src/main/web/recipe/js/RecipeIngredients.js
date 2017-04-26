import React, {Component} from "react";
import PropTypes from "prop-types";
import RecipeIngredient from "./RecipeIngredient";

class RecipeIngredients extends Component {

  render() {
    const ingredients = this.props.recipeIngredients;
    return (
        <div>
          <h3>Ingredients</h3>
          <div>
            {ingredients.map(i => <RecipeIngredient key={i.id} recipeIngredient={i}/>)}
          </div>
        </div>
    );
  }
}

RecipeIngredients.propTypes = {
  recipeIngredients: PropTypes.array.isRequired
};

export default RecipeIngredients;
