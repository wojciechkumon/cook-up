import React, {Component} from "react";
import Sidebar from "./Sidebar";
import "./LayoutWrapper.scss";

class LayoutWrapper extends Component {
  render() {
    return (
      <div>
        <Sidebar/>
        <div className='Content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default LayoutWrapper;
