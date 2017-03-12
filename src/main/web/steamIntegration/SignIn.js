import React, {Component} from "react";
import "./SignIn.scss";
import client from "../restclient/client";
import postClient from "../restclient/postClient";

class SignIn extends Component {

  redirectToSteamLogin() {
    // TODO disable button/link
    client({method: 'GET', path: '/api/steamAuthRequest'}).done(response => {
      const endpoint = response.entity.endpoint;
      const parametersMap = response.entity.parametersMap;
      postClient.nonAjaxPost(endpoint, parametersMap);
    });
  }

  render() {
    return (
      <div className='SignIn' onClick={this.redirectToSteamLogin}>
        Sign In
      </div>
    );
  }
}

export default SignIn;
