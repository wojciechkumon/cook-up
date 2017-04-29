import React, {Component} from "react";
import FontAwesome from 'react-fontawesome';
import "../style/Loader.scss";

class Loader extends Component {

  render() {
    return (
        <FontAwesome className="Loader"
            name='circle-o-notch'
            size='2x'
        />
    );
  }
}

export default Loader;