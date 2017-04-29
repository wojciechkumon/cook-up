import React, {Component} from "react";
import PropTypes from "prop-types";
import {Row, Table} from "react-bootstrap";
import RecipeListRow from "./RecipeListRow";

class RecipeList extends Component {

  render() {
    const {recipes} = this.props;
    const tableRows = recipes.map(recipe => <RecipeListRow recipe={recipe}/>);

    return (
      <Row className="show-grid">
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
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;
