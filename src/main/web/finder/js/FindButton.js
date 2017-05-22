import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import formValueSelector from "redux-form/es/formValueSelector";
import {Button} from "react-bootstrap";
import {fetchMatchingRecipesIfNeeded} from "../../recipe/js/actions/actions";
import "../style/FindButton.scss";

class FindButton extends Component {

  find = () => {
    const {dispatch, useSimilarIngredients} = this.props;
    dispatch(fetchMatchingRecipesIfNeeded(useSimilarIngredients));
  };

  render() {
    const {disabled} = this.props;
    return (
      <Button
        className="FindButton"
        bsStyle="primary"
        onClick={this.find}
        disabled={disabled}
      >Find</Button>
    );
  }
}

FindButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  useSimilarIngredients: PropTypes.bool.isRequired
};

const selector = formValueSelector('finder-checkbox');
const mapStateToProps = state => {
  return {
    useSimilarIngredients: selector(state, 'similarIngredients') === true
  }
};

FindButton = connect(mapStateToProps)(FindButton);

export default FindButton;
