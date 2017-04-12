import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import "../style/IngredientList.scss";
import SingleIngredient from './SingleIngredient';

class IngredientList extends Component {

  render() {
    const ingredients = this.props.ingredients;
    const ingredientsList = ingredients.map(ingredient =>
        <SingleIngredient key={ingredient.id} ingredient={ingredient}/>);

    return (
        <div>
          {ingredientsList}
        </div>
    );
  }
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredientUnit: PropTypes.string.isRequired
  })).isRequired
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  }
};

IngredientList = connect(mapStateToProps)(IngredientList);

export default IngredientList;