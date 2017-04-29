import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Autocomplete from "react-autocomplete";
import AutocompleteUtils from "./AutocompleteUtils";
import {addIngredient} from "./actions/actions";
import "../style/FinderAutocomplete.scss";

class FinderAutocomplete extends Component {

  constructor() {
    super();
    this.state = {searchText: ''};
  }

  addNewIngredient(name) {
    this.setState({searchText: ''});
    const newIngredient = this.getIngredientByName(name);
    if (newIngredient) {
      this.props.dispatch(addIngredient(newIngredient));
    }
  }

  getIngredientByName(name) {
    return this.props.ingredients.find(ingredient => ingredient.name === name);
  }

  render() {
    const {ingredients} = this.props;

    return (
      <Autocomplete
        value={this.state.searchText}
        inputProps={{
          name: "Ingredients",
          className: "ingredient-autocomplete"
        }}
        items={ingredients}
        getItemValue={(item) => item.name}
        shouldItemRender={AutocompleteUtils.matchIngredientToTerm}
        sortItems={AutocompleteUtils.sortIngredient}
        onChange={(event, searchText) => this.setState({searchText})}
        onSelect={value => this.addNewIngredient(value)}
        renderItem={(item, isHighlighted) => (
          <div className={isHighlighted ? 'autocomplete-highlighted-item'
            : 'autocomplete-item'}
               key={item.abbr}>{item.name}</div>
        )}
      />
    );
  }
}

FinderAutocomplete.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredientUnit: PropTypes.string.isRequired
  })).isRequired
};

FinderAutocomplete = connect()(FinderAutocomplete);

export default FinderAutocomplete;
