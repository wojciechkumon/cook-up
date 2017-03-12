import React, {Component} from "react";
import "./AvatarBox.scss";
import client from "./restclient/client";

class AvatarBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'anonymous',
      avatarUrl: ''
    };
  }

  componentDidMount() {
    client({method: 'GET', path: '/api/me'}).done(response => {
      this.setState({
                      username: response.entity.username,
                      avatarUrl: response.entity.avatarUrl
                    });
    });
  }

  render() {
    return (
      <div className='AvatarBox'>
        nick: {this.state.username}<br/>
        {this.state.avatarUrl.length > 0 && <img src={this.state.avatarUrl} alt="avatar"/>}<br/>
      </div>
    );
  }
}

export default AvatarBox;
