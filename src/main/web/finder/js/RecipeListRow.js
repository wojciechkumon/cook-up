import React, {Component} from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'

class RecipeListRow extends Component {

  click = () => {
    const {recipe} = this.props;
    this.props.history.push('/recipe/' + recipe.id);
  };

  render() {
    const {recipe} = this.props;
    return (
      <tr onClick={this.click}>
        <td>{recipe.name}</td>
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

export default withRouter(RecipeListRow);
