import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import '../style/SingleIngredient.scss';
import {removeIngredient} from './actions/actions';

class SingleIngredient extends Component {

  render() {
    const ingredient = this.props.ingredient;
    const remove = () => this.props.dispatch(removeIngredient(ingredient.id));
    const name = ingredient.name;
    // const unit = ingredient.ingredientUnit;
    return (
        <div className="SingleIngredient">
          <p>
            <span>{name}</span>
            <i className="glyphicon glyphicon-remove" onClick={remove}></i>
          </p>
        </div>
    );
  }
}

SingleIngredient.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredientUnit: PropTypes.string.isRequired
  }).isRequired
};

SingleIngredient = connect()(SingleIngredient);

export default SingleIngredient;
