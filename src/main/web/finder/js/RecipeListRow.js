import React, {Component} from "react";
import PropTypes from "prop-types";

class RecipeListRow extends Component {

  render() {
    const {recipe} = this.props.recipe;
    return (
      <tr>
        <td>{recipe.cookingTimeMinutes + ' min'}</td>
        <td>{recipe.difficultyLevel}</td>
        <td>{recipe.kcal + ' kcal'}</td>
        <td>{recipe.servings + ' serving' + (recipe.servings > 1 ? 's' : '')}</td>
      </tr>
    );
  }
}

RecipeListRow.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeListRow;
