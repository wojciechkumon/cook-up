import React, {Component} from "react";
import {Glyphicon} from "react-bootstrap";
import PropTypes from "prop-types";
import "../style/RecipeIngredient.scss";
import ToggleDisplay from "react-toggle-display";

class RecipeIngredient extends Component {
  constructor() {
    super();
    this.state = {show: false};
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const {recipeIngredient} = this.props;
    const substitutes = recipeIngredient.substitutes.map(
        sub => <li key={sub.id}>{sub.name}</li>);

    return (
        <div className="RecipeIngredient">
          <p>
            <Glyphicon className="plus" glyph="plus"/>
            {recipeIngredient.amount + ' '
            + recipeIngredient.ingredient.ingredientUnit + ' '
            + recipeIngredient.ingredient.name}
            {(substitutes.length > 0) && <button
                onClick={ () => this.handleClick() }>substitutes</button>}
          </p>
          <ToggleDisplay show={this.state.show}>
            <ul>
              {substitutes}
            </ul>
          </ToggleDisplay>
        </div>
    );
  }
}

RecipeIngredient.propTypes = {
  recipeIngredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    ingredient: PropTypes.shape({
      ingredientUnit: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    substitutes: PropTypes.array.isRequired
  }).isRequired
};

export default RecipeIngredient;
