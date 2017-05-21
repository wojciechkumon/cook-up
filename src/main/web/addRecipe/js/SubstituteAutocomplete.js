import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import {fetchIngredientsIfNeeded} from "../../finder/js/actions/actions";

class SubstituteAutocomplete extends Component {

  constructor() {
    super();
    this.state = {chosenIngredients: undefined};
  }

  componentDidMount() {
    const {dispatch, input: {onChange}} = this.props;
    dispatch(fetchIngredientsIfNeeded());
    const {chosenIngredients} = this.state;
    onChange(chosenIngredients);
  }

  handleSelectChange = chosenIngredients => {
    const {input: {onChange}} = this.props;
    onChange(chosenIngredients);
    this.setState({chosenIngredients});
  };

  render() {
    const {ingredients, isFetching} = this.props;
    const {chosenIngredients} = this.state;
    return (
      <Select
        placeholder="Select substitutes"
        valueKey="id"
        labelKey="name"
        value={chosenIngredients}
        options={ingredients}
        multi
        onChange={this.handleSelectChange}
        isLoading={isFetching}
      />
    );
  }
}

SubstituteAutocomplete.propTypes = {
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

SubstituteAutocomplete = connect(mapStateToProps)(SubstituteAutocomplete);

export default SubstituteAutocomplete;