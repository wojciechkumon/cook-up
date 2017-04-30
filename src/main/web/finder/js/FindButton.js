import React, {Component} from "react";
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
          bsStyle="primary"
          onClick={this.find}
        >Find</Button>
    );
  }
}

FindButton = connect()(FindButton);

export default FindButton;
