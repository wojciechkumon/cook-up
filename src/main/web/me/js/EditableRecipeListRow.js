import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class EditableRecipeListRow extends Component {

  goToRecipe = () => {
    const {history, recipe} = this.props;
    history.push('/recipe/' + recipe.id);
  };

  editRecipe = e => {
    this.props.history.push('/edit');
    e.stopPropagation();
  };

  deleteRecipe = e => {
    this.props.history.push('/delete');
    e.stopPropagation();
  };

  render() {
    const {recipe} = this.props;
    return (
      <tr onClick={this.goToRecipe}>
        <td>{recipe.name}</td>
        <td>{recipe.cookingTimeMinutes + ' min'}</td>
        <td>{recipe.difficultyLevel}</td>
        <td>{recipe.kcal + ' kcal'}</td>
        <td>{recipe.servings + ' serving' + (recipe.servings > 1 ? 's' : '')}</td>
        <td onClick={this.editRecipe}>edit</td>
        <td onClick={this.deleteRecipe}>x</td>
      </tr>
    );
  }
}

EditableRecipeListRow.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default withRouter(EditableRecipeListRow);