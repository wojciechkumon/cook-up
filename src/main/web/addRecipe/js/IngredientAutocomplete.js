import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import Field from "redux-form/es/Field";
import {fetchIngredientsIfNeeded} from "../../finder/js/actions/actions";
import {renderError} from "../../util/js/forms";

class IngredientAutocomplete extends Component {

  constructor() {
    super();
    this.state = {chosenIngredient: undefined};
  }

  componentDidMount() {
    this.props.dispatch(fetchIngredientsIfNeeded());
  }

  handleSelectChange = chosenIngredient => {
    this.setState({chosenIngredient});
  };

  render() {
    const {ingredients, isFetching, ingredientNumber} = this.props;
    const {chosenIngredient} = this.state;
    return (
      <div>
        <Select
          placeholder="Select ingredient"
          valueKey="id"
          labelKey="name"
          value={chosenIngredient}
          options={ingredients}
          onChange={this.handleSelectChange}
          isLoading={isFetching}
        />
        <Field name={`${ingredientNumber}.ingredient2`}
               type="hidden"
               component={renderError}
               value={chosenIngredient}/>
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
  isFetching: PropTypes.bool.isRequired,
  ingredientNumber: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.allIngredients.data,
    isFetching: state.ingredients.allIngredients.isFetching
  }
};

IngredientAutocomplete = connect(mapStateToProps)(IngredientAutocomplete);

export default IngredientAutocomplete;