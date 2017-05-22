import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import {fetchIngredientsIfNeeded} from "../../finder/js/actions/actions";

class IngredientAutocomplete extends Component {

  constructor() {
    super();
    this.state = {chosenIngredient: undefined};
  }

  componentDidMount() {
    this.props.dispatch(fetchIngredientsIfNeeded());
  }

  handleSelectChange = chosenIngredient => {
    const {input: {onChange}} = this.props;
    onChange(chosenIngredient);
    this.setState({chosenIngredient});
  };

  render() {
    const {ingredients, isFetching} = this.props;
    const {chosenIngredient} = this.state;
    return (
        <div className="autocomplete-ingredient">
          <Select
              placeholder="Select ingredient"
              valueKey="id"
              labelKey="name"
              value={chosenIngredient}
              options={ingredients}
              onChange={this.handleSelectChange}
              isLoading={isFetching}
          />
        </div>
    );
  }
}

IngredientAutocomplete.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredientUnit: PropTypes.string.isRequired
  })).isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.allIngredients.data,
    isFetching: state.ingredients.allIngredients.isFetching
  }
};

IngredientAutocomplete = connect(mapStateToProps)(IngredientAutocomplete);

export default IngredientAutocomplete;