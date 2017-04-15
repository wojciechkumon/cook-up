import React, {Component} from "react";
import Header from "../../header/js/Header";
import Footer from "../../footer/js/Footer";
import Wrapper from "../../wrapper/js/Wrapper";

class LayoutWrapper extends Component {
  render() {
    return (
        <div>
          <Header/>
          <Wrapper/>
          <div>
            {this.props.children}
          </div>
          <Footer/>
        </div>
    );
  }
}

export default LayoutWrapper;
