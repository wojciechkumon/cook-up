import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {fetchMatchingRecipesIfNeeded} from "../../recipe/js/actions/actions";

class FindButton extends Component {

  find = () => {
    this.props.dispatch(fetchMatchingRecipesIfNeeded());
  };

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.find}
        >Find</Button>
      </div>
    );
  }
}

FindButton = connect()(FindButton);

export default FindButton;
