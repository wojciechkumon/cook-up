import React, {Component} from "react";
import PropTypes from "prop-types";
import {Row, Table} from "react-bootstrap";
import RecipeListRow from "./RecipeListRow";
import "../style/RecipeList.scss";

class RecipeList extends Component {

  render() {
    const {recipes} = this.props;
    const tableRows = recipes.map(
        recipe => <RecipeListRow key={recipe.id} recipe={recipe}/>);

    return (
        <div className="RecipeList">
          <Row>
            <Table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Cooking Time</th>
                <th>Difficulty</th>
                <th>Kcal</th>
                <th>Servings</th>
              </tr>
              </thead>
              <tbody>
              {tableRows}
              </tbody>
            </Table>
          </Row>
        </div>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;
