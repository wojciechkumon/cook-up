import React, {Component} from "react";
import Loader from "../../util/js/Loader";
import "../style/AuthChecking.scss";

class AuthChecking extends Component {

  render() {
    return (
      <div className="AuthChecking">
        <div className="auth-label">Authentication checking</div>
        <div><Loader/></div>
      </div>
    );
  }
}

export default AuthChecking;