import React, {Component} from "react";
import {connect} from "react-redux";
import '../style/Recipe.scss';
import PropTypes from "prop-types";

class RecipeIngredients extends Component {

  render() {
    const ingredients = this.props.recipeIngredients;
    return (
        <div>
          <h3>Ingredients</h3>
          <div>{ingredients.map(i =>
              <div key={i.ingredient.id} className="Ingredient">
                <i className="glyphicon glyphicon-plus"/>
                {i.amount + ' ' + i.ingredient.ingredientUnit + ' '
                + i.ingredient.name}
              </div>
          )}</div>
        </div>
    );
  }
}

RecipeIngredients.propTypes = {
  recipeIngredients: PropTypes.array.isRequired
};

export default RecipeIngredients;
