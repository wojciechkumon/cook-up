import React, {Component} from "react";
import {connect} from "react-redux";
import Finder from "../../finder/js/Finder";
import {showLoginModal} from "../../header/js/actions/actions";

class LoginPage extends Component {

  componentDidMount() {
    this.props.dispatch(showLoginModal());
  }

  render() {
    return (
      <div>
        <Finder/>
      </div>
    );
  }
}

LoginPage = connect()(LoginPage);

export default LoginPage;
