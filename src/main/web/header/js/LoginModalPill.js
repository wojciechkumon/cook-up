import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import "../style/modals.scss";

class LoginModalPill extends Component {

  constructor() {
    super();
    this.state = {showLogInModal: false};
  }

  openLogInModal = () => {
    this.setState({showLogInModal: true});
  };

  closeLogInModal = () => {
    this.setState({showLogInModal: false});
  };

  render() {
    return (
        <li>
          <a onClick={this.openLogInModal}>Log in</a>

          <Modal show={this.state.showLogInModal}
                 onHide={this.closeLogInModal}>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Log in form</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                  onClick={this.closeLogInModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </li>
    );
  }
}

export default LoginModalPill;
