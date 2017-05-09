import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {fetchMatchingRecipesIfNeeded} from "../../recipe/js/actions/actions";
import "../style/FindButton.scss";

class FindButton extends Component {

  find = () => {
    this.props.dispatch(fetchMatchingRecipesIfNeeded());
  };

  render() {
    return (
        <Button
            className="FindButton"
            bsStyle="primary"
            onClick={this.find}
            disabled={this.props.disabled}
        >Find</Button>
    );
  }
}

FindButton.propTypes = {
  disabled: PropTypes.bool.isRequired
};

FindButton = connect()(FindButton);

export default FindButton;
