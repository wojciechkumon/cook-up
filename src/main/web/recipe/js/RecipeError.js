import React, {Component} from "react";
import PropTypes from "prop-types";
import {HTTP_NOT_FOUND} from "../../main/js/actions/actions";
import "../style/RecipeError.scss";

class RecipeError extends Component {

  render() {
    const {errorType} = this.props;

    return (
      <div className="RecipeError">
        {errorType === HTTP_NOT_FOUND ? 'Recipe not found!' : 'Error while fetching recipe'}
      </div>
    );
  }
}

RecipeError.propTypes = {
  errorType: PropTypes.string.isRequired
};

export default RecipeError;
