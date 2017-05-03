import React, {Component} from "react";
import {Link} from "react-router-dom";

class MePill extends Component {

  render() {
    return (
      <li>
        <Link to="/me">Me</Link>
      </li>
    );
  }
}

export default MePill;
