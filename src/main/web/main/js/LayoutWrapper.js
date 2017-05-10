import React, {Component} from "react";
import NavMenu from "../../header/js/NavMenu";
import Footer from "../../footer/js/Footer";
import Header from "../../header/js/Header";

class LayoutWrapper extends Component {
  render() {
    return (
        <div>
          <NavMenu/>
          <Header/>
          <div>
            {this.props.children}
          </div>
          <Footer/>
        </div>
    );
  }
}

export default LayoutWrapper;
