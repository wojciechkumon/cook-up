import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {hideLoginModal, showLoginModal} from "./actions/actions";
import "../style/modals.scss";

class LoginModalPill extends Component {

  openLogInModal = () => {
    this.props.dispatch(showLoginModal());
  };

  closeLogInModal = () => {
    this.props.dispatch(hideLoginModal());
  };

  render() {
    return (
        <li>
          <a onClick={this.openLogInModal}>Log in</a>

          <Modal show={this.props.showModal}
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

LoginModalPill.propTypes = {
  showModal: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    showModal: state.frontend.modals.showLoginModal
  }
};

LoginModalPill = connect(mapStateToProps)(LoginModalPill);

export default LoginModalPill;
