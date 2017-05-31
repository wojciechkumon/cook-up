import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import FontAwesome from "react-fontawesome";
import "../style/EditableRecipeListRow.scss";
import DeleteRecipeListRow from "./DeleteRecipeListRow";

class EditableRecipeListRow extends Component {

  goToRecipe = () => {
    const {history, recipe} = this.props;
    history.push('/recipe/' + recipe.id);
  };

  editRecipe = e => {
    const {history, recipe} = this.props;
    history.push('/editRecipe/' + recipe.id);
    e.stopPropagation();
  };

  render() {
    const {recipe, dispatch} = this.props;
    return (
      <tr onClick={this.goToRecipe} className="EditableRecipeListRow">
        <td>{recipe.name}</td>
        <td>{recipe.cookingTimeMinutes + ' min'}</td>
        <td>{recipe.difficultyLevel}</td>
        <td>{recipe.kcal + ' kcal'}</td>
        <td>{recipe.servings + ' serving' + (recipe.servings > 1 ? 's'
          : '')}</td>
        <td className="edit-button" onClick={this.editRecipe}><FontAwesome
          name="pencil-square-o"/></td>
        <DeleteRecipeListRow recipe={recipe} dispatch={dispatch}/>
      </tr>
    );
  }
}

EditableRecipeListRow.propTypes = {
  recipe: PropTypes.object.isRequired
};

EditableRecipeListRow = connect()(EditableRecipeListRow);

export default withRouter(EditableRecipeListRow);