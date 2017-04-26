import React, {Component} from "react";
import {connect} from "react-redux";
import '../style/Recipe.scss';
import PropTypes from "prop-types";

class RecipeIngredient extends Component {

  render() {
    const recipeIngredient = this.props.recipeIngredient;
    return (
        <div className="Ingredient">
          <i className="glyphicon glyphicon-plus"/>
          {recipeIngredient.amount + ' '
          + recipeIngredient.ingredient.ingredientUnit + ' '
          + recipeIngredient.ingredient.name}
        </div>
    );
  }
}

RecipeIngredient.propTypes = {
  recipeIngredient: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
      ingredientUnit: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    substitutes: PropTypes.array.isRequired
  }).isRequired
};

export default RecipeIngredient;
