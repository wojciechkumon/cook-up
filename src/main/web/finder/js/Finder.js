import React, {Component} from "react";
import {connect} from 'react-redux';
import "../style/Finder.scss";
import Autocomplete from 'react-autocomplete';
import IngredientList from './IngredientList';
import AutocompleteUtils from './AutocompleteUtils';
import {addIngredient} from './actions/actions';

class Finder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.addNewIngredient = this.addNewIngredient.bind(this);
  }

  addNewIngredient(name) {
    this.setState({inputValue: ''});
    const newIngredient = AutocompleteUtils.getProductByName(name);
    if (newIngredient) {
      this.props.dispatch(addIngredient(newIngredient));
    }
  }

  render() {
    return (
        <div className="Finder">
          <Autocomplete
              value={this.state.inputValue}
              inputProps={{name: "Products", id: "products-autocomplete"}}
              items={AutocompleteUtils.getProducts()}
              getItemValue={(item) => item.name}
              shouldItemRender={AutocompleteUtils.matchProductToTerm}
              sortItems={AutocompleteUtils.sortProducts}
              onChange={(event, inputValue) => this.setState({inputValue})}
              onSelect={value => this.addNewIngredient(value)}
              renderItem={(item, isHighlighted) => (
                  <div key={item.abbr}>{item.name}</div>
              )}
          />

          <IngredientList/>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  }
};

Finder = connect(mapStateToProps)(Finder);

export default Finder;
