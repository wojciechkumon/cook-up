import React, {Component} from "react";
import {Modal, Button} from 'react-bootstrap';
import '../style/modals.scss';

class SignInModalPill extends Component {

  constructor() {
    super();
    this.state = {
      showSignInModal: false
    };

    this.openSignInModal = this.openSignInModal.bind(this);
    this.closeSignInModal = this.closeSignInModal.bind(this);
  }

  closeSignInModal() {
    this.setState({showSignInModal: false});
  }

  openSignInModal() {
    this.setState({showSignInModal: true});
  }

  render() {
    return (
        <li>
          <a onClick={this.openSignInModal}>Sign In</a>
          <Modal show={this.state.showSignInModal}
                 onHide={this.closeSignInModal}>
            <Modal.Header closeButton>
              <Modal.Title>Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Sign in form</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeSignInModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </li>
    );
  }
}

export default SignInModalPill;
