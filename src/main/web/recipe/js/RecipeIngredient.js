import React, {Component} from "react";
import {Glyphicon} from "react-bootstrap";
import PropTypes from "prop-types";
import '../style/RecipeIngredient.scss';

class RecipeIngredient extends Component {

  render() {
    const recipeIngredient = this.props.recipeIngredient;
    return (
        <div className="RecipeIngredient">
          <p>
            <Glyphicon glyph="plus" />
            {recipeIngredient.amount + ' '
            + recipeIngredient.ingredient.ingredientUnit + ' '
            + recipeIngredient.ingredient.name}
          </p>
        </div>
    );
  }
}

RecipeIngredient.propTypes = {
  recipeIngredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
      ingredientUnit: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    substitutes: PropTypes.array.isRequired
  }).isRequired
};

export default RecipeIngredient;
