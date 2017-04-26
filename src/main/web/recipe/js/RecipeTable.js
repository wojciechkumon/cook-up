import React, {Component} from "react";
import "../style/RecipeTable.scss";
import PropTypes from "prop-types";
import {Col, Table} from "react-bootstrap";

class RecipeTable extends Component {

  render() {
    const {recipe} = this.props;
    return (
      <Col md={6} className="RecipeTable">
        <Table>
          <thead>
          <tr>
            <th>Cooking Time</th>
            <th>Difficulty</th>
            <th>Kcal</th>
            <th>Servings</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{recipe && recipe.cookingTimeMinutes + ' min'}</td>
            <td>{recipe && recipe.difficultyLevel}</td>
            <td>{recipe && recipe.kcal + ' kcal'}</td>
            <td>{recipe && recipe.servings + ' serving' + (recipe.servings > 1 ? 's' : '')}</td>
          </tr>
          </tbody>
        </Table>
      </Col>
    );
  }
}

RecipeTable.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeTable;
