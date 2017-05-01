import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {submit} from "redux-form";
import {hideLoginModal, showLoginModal} from "./actions/actions";
import "../style/modals.scss";
import LoginForm from "./LoginForm";
import {handleSubmit} from "./loginSubmitter";

class LoginModalPill extends Component {

  openLogInModal = () => {
    this.props.dispatch(showLoginModal());
  };

  closeLogInModal = () => {
    this.props.dispatch(hideLoginModal());
  };

  login = () => {
    this.props.dispatch(submit('login-form'));
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
            <LoginForm onSubmit={handleSubmit(this.props.dispatch)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={this.login}>Submit</Button>
            <Button onClick={this.closeLogInModal}>Close</Button>
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
