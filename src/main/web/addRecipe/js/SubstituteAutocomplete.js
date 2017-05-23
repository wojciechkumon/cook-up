import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import {fetchIngredientsIfNeeded} from "../../finder/js/actions/actions";

class SubstituteAutocomplete extends Component {

  componentDidMount() {
    this.props.dispatch(fetchIngredientsIfNeeded());
  }

  handleSelectChange = chosenSubstitutes => {
    const {input: {onChange}} = this.props;
    onChange(chosenSubstitutes);
  };

  render() {
    const {ingredients, isFetching, chosenSubstitutes} = this.props;
    return (
        <div className="autocomplete-substitute">
          <Select
              placeholder="Select substitutes"
              valueKey="id"
              labelKey="name"
              value={chosenSubstitutes}
              options={ingredients}
              multi
              onChange={this.handleSelectChange}
              isLoading={isFetching}
          />
        </div>
    );
  }
}

const ingredientPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  ingredientUnit: PropTypes.string.isRequired
});

SubstituteAutocomplete.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  isFetching: PropTypes.bool.isRequired,
  chosenSubstitutes: PropTypes.arrayOf(ingredientPropType)
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.allIngredients.data,
    isFetching: state.ingredients.allIngredients.isFetching
  }
};

SubstituteAutocomplete = connect(mapStateToProps)(SubstituteAutocomplete);

export default SubstituteAutocomplete;