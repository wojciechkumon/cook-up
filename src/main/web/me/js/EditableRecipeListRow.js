import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import FontAwesome from "react-fontawesome";
import "../style/EditableRecipeListRow.scss";
import {deleteCreatedRecipe} from "./actions/actions";

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
    const {dispatch, recipe} = this.props;
    dispatch(deleteCreatedRecipe(recipe.id));
    e.stopPropagation();
  };

  render() {
    const {recipe} = this.props;
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
          <td className="remove-button" onClick={this.deleteRecipe}><FontAwesome
              name="times"/></td>
        </tr>
    );
  }
}

EditableRecipeListRow.propTypes = {
  recipe: PropTypes.object.isRequired
};

EditableRecipeListRow = connect()(EditableRecipeListRow);

export default withRouter(EditableRecipeListRow);