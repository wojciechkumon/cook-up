import React, {Component} from "react";
import FontAwesome from 'react-fontawesome';

class Loader extends Component {

  render() {
    return (
        <FontAwesome
            name='circle-o-notch'
            size='2x'
            spin
        />
    );
  }
}

export default Loader;