import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {showSignInModal, hideSignInModal} from "./actions/actions";
import "../style/modals.scss";

class SignInModalPill extends Component {

  openSignInModal = () => {
    this.props.dispatch(showSignInModal());
  };

  closeSignInModal = () => {
    this.props.dispatch(hideSignInModal());
  };

  render() {
    return (
        <li>
          <a onClick={this.openSignInModal}>Sign In</a>
          <Modal show={this.props.showModal}
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

SignInModalPill.propTypes = {
  showModal: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    showModal: state.frontend.modals.showSignInModal
  }
};

SignInModalPill = connect(mapStateToProps)(SignInModalPill);

export default SignInModalPill;
