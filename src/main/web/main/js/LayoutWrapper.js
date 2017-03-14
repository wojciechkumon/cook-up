import React, {Component} from "react";
import "../style/LayoutWrapper.scss";
import Header from "../../header/js/Header";
import Footer from "../../footer/js/Footer";

class LayoutWrapper extends Component {
  render() {
    return (
        <div>
          <Header/>
          <div className='Content'>
            {this.props.children}
          </div>
          <Footer/>
        </div>
    );
  }
}

export default LayoutWrapper;
