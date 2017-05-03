import React, {Component} from "react";
import {connect} from "react-redux";
import {serverLogout} from "../../security/js/actions/actions"

class LogoutPill extends Component {

  logout = () => {
    this.props.dispatch(serverLogout());
  };

  render() {
    return (
      <li>
        <a onClick={this.logout}>Logout</a>
      </li>
    );
  }
}

LogoutPill = connect()(LogoutPill);

export default LogoutPill;
