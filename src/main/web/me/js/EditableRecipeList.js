import React, {Component} from "react";
import PropTypes from "prop-types";
import {Row, Table} from "react-bootstrap";
import EditableRecipeListRow from "./EditableRecipeListRow";
import "../../finder/style/RecipeList.scss";

class EditableRecipeList extends Component {

  render() {
    const {recipes} = this.props;
    const tableRows = recipes.map(
      recipe => <EditableRecipeListRow key={recipe.id} recipe={recipe}/>);

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
              <th>Edit</th>
              <th>Remove</th>
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

EditableRecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default EditableRecipeList;