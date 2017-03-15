import React, {Component} from "react";
import "../style/LayoutWrapper.scss";
import Header from "../../header/js/Header";
import Footer from "../../footer/js/Footer";
import Wrapper from "../../wrapper/js/Wrapper";

class LayoutWrapper extends Component {
  render() {
    return (
        <div>
          <Header/>
          <Wrapper/>
          <div className='Content'>
            {this.props.children}
          </div>
          <Footer/>
        </div>
    );
  }
}

export default LayoutWrapper;
