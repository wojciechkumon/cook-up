import React, {Component} from "react";
import {connect} from 'react-redux';
import "../style/Finder.scss";
import {Grid, Col, Row} from 'react-bootstrap';
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
    const newIngredient = AutocompleteUtils.getIngredientByName(name);
    if (newIngredient) {
      this.props.dispatch(addIngredient(newIngredient));
    }
  }

  render() {
    return (
        <div className="Finder">
          <Grid>
            <Row className="show-grid">
              <h1>What do you have in your fridge?</h1>
            </Row>
            <Row className="show-grid">
              <div className="autocomplete-input">
                <Autocomplete
                    value={this.state.inputValue}
                    inputProps={{
                      name: "Ingredients",
                      id: "ingredient-autocomplete"
                    }}
                    items={AutocompleteUtils.getIngredients()}
                    getItemValue={(item) => item.name}
                    shouldItemRender={AutocompleteUtils.matchIngredientToTerm}
                    sortItems={AutocompleteUtils.sortIngredient}
                    onChange={(event, inputValue) => this.setState(
                        {inputValue})}
                    onSelect={value => this.addNewIngredient(value)}
                    renderItem={(item, isHighlighted) => (
                        <div className={isHighlighted ?
                            'autocomplete-highlighted-item'
                            : 'autocomplete-item'}
                             key={item.abbr}>{item.name}</div>
                    )}
                />
              </div>
              <IngredientList/>
            </Row>
          </Grid>
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
