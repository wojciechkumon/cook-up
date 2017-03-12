import React, {Component} from "react";
import "./LayoutWrapper.scss";

class LayoutWrapper extends Component {
  render() {
    return (
      <div>
        <div className='Content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default LayoutWrapper;
