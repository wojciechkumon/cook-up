import React, {Component} from "react";
import {Button, Glyphicon} from "react-bootstrap";

class Finder extends Component {
  render() {
    return (
      <div>
        Finder
        <Button bsStyle="primary">Primary</Button>
        <Glyphicon glyph="home"/>
        <Button bsStyle="success">Success</Button>
      </div>
    );
  }
}

export default Finder;
