import React, {Component} from "react";
import "../style/RecipeTable.scss";
import PropTypes from "prop-types";
import {Col, Table, Glyphicon} from "react-bootstrap";

class RecipeTable extends Component {

  render() {
    const {recipe} = this.props;
    return (
      <Col md={6} className="RecipeTable">
        <Table>
          <thead>
          <tr>
            <th><p>Cooking <br />Time</p></th>
            <th><p className="singleWordTitle">Difficulty</p></th>
            <th><p className="singleWordTitle">Kcal</p></th>
            <th><p className="singleWordTitle">Servings</p></th>
            <th><p>Add to <br /> favourites</p></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{recipe && recipe.cookingTimeMinutes + ' min'}</td>
            <td>{recipe && recipe.difficultyLevel}</td>
            <td>{recipe && recipe.kcal + ' kcal'}</td>
            <td>{recipe && recipe.servings + ' serving' + (recipe.servings > 1 ? 's' : '')}</td>
            <td><Glyphicon glyph="heart"/></td>
          </tr>
          </tbody>
        </Table>
      </Col>
    );
  }
}

RecipeTable.propTypes = {
  recipe: PropTypes.object
};

export default RecipeTable;
