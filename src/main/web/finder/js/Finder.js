import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "../style/Finder.scss";
import {Grid, Row} from "react-bootstrap";
import FoundRecipes from "./FoundRecipes";
import {fetchIngredientsIfNeeded} from "./actions/actions";
import FindButton from "./FindButton";
import FinderAutocomplete from "./FinderAutocomplete";

class Finder extends Component {

  componentDidMount() {
    this.props.dispatch(fetchIngredientsIfNeeded());
  }

  render() {
    const {allIngredients} = this.props;
    const error = allIngredients && allIngredients.error;
    const disabled = (error || allIngredients.data.length <= 0) !== false;

    return (
      <div className="Finder">
        <Grid>
          <Row className="show-grid">
            <h1>What do you have in your fridge?</h1>
            <div>
              <FinderAutocomplete ingredients={allIngredients.data}
                                  chosenIngredients={this.props.chosenIngredients}
                                  isFetching={allIngredients.isFetching}
                                  disabled={disabled}/>
              <FindButton disabled={disabled}/>
            </div>
            {error && <p className="ingredients-error">Error during downloading
              ingredients</p>}
            <FoundRecipes/>
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
  allIngredients: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      ingredientUnit: PropTypes.string.isRequired
    })).isRequired,
    isFetching: PropTypes.bool,
    didInvalidate: PropTypes.bool,
    lastUpdated: PropTypes.number
  }).isRequired
};

const mapStateToProps = state => {
  return {
    chosenIngredients: state.ingredients.chosenIngredients,
    allIngredients: state.ingredients.allIngredients
  }
};

Finder = connect(mapStateToProps)(Finder);

export default Finder;
