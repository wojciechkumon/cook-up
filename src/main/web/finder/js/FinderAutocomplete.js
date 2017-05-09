import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import "../style/FinderAutocomplete.scss";
import Select from "react-select";
import {setChosenIngredients} from "./actions/actions";

class FinderAutocomplete extends Component {

  handleSelectChange = ingredients => {
    this.props.dispatch(setChosenIngredients(ingredients));
  };

  render() {
    const {ingredients, disabled, isFetching, chosenIngredients} = this.props;

    return (
      <div>
        <Select
          placeholder="Select your products"
          valueKey="id"
          labelKey="name"
          multi
          disabled={disabled}
          value={chosenIngredients}
          options={ingredients}
          onChange={this.handleSelectChange}
          isLoading={isFetching}
        />
      </div>
    );
  }
}

FinderAutocomplete.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredientUnit: PropTypes.string.isRequired
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  chosenIngredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredientUnit: PropTypes.string.isRequired
  })).isRequired
};

FinderAutocomplete = connect()(FinderAutocomplete);

export default FinderAutocomplete;
