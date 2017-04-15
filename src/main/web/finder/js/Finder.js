import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "../style/Finder.scss";
import {Grid, Row} from "react-bootstrap";
import Autocomplete from "react-autocomplete";
import IngredientList from "./IngredientList";
import AutocompleteUtils from "./AutocompleteUtils";
import {addIngredient, setAllIngredients} from "./actions/actions";
import client from "../../restclient/client";

class Finder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };

    this.addNewIngredient = this.addNewIngredient.bind(this);
  }

  componentDidMount() {
    if (this.props.allIngredients.length > 0) {
      return;
    }
    client({method: 'GET', path: '/api/ingredients'}).then(response => {
      this.props.dispatch(setAllIngredients(response.entity));
    });
  }

  addNewIngredient(name) {
    this.setState({inputValue: ''});
    const newIngredient = this.getIngredientByName(name);
    if (newIngredient) {
      this.props.dispatch(addIngredient(newIngredient));
    }
  }

  getIngredientByName(name) {
    return this.props.allIngredients.find(ingredient => ingredient.name === name);
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
                  items={this.props.allIngredients}
                  getItemValue={(item) => item.name}
                  shouldItemRender={AutocompleteUtils.matchIngredientToTerm}
                  sortItems={AutocompleteUtils.sortIngredient}
                  onChange={(event, inputValue) => this.setState({inputValue})}
                  onSelect={value => this.addNewIngredient(value)}
                  renderItem={(item, isHighlighted) => (
                    <div className={isHighlighted ? 'autocomplete-highlighted-item'
                      : 'autocomplete-item'}
                         key={item.abbr}>{item.name}</div>
                  )}
                />
              </div>
              <IngredientList ingredients={this.props.chosenIngredients}/>
            </Row>
          </Grid>
        </div>
    );
  }
}

Finder.propTypes = {
  chosenIngredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredientUnit: PropTypes.string.isRequired
  })).isRequired,
  allIngredients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredientUnit: PropTypes.string.isRequired
  })).isRequired
};

const mapStateToProps = (state) => {
  return {
    chosenIngredients: state.ingredients.chosenIngredients,
    allIngredients: state.ingredients.allIngredients
  }
};

Finder = connect(mapStateToProps)(Finder);

export default Finder;
