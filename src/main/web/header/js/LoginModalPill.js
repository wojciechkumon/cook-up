import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {submit} from "redux-form/es/actions";
import {withRouter} from "react-router-dom";
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
    const {submitting} = this.props;
    return (
      <li>
        <a onClick={this.openLogInModal}>Log in</a>

        <Modal show={this.props.showModal}
               onHide={this.closeLogInModal}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm onSubmit={handleSubmit(this.props.dispatch, this.props.history)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" disabled={submitting} onClick={this.login}>Submit</Button>
            <Button disabled={submitting} onClick={this.closeLogInModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </li>
    );
  }
}

LoginModalPill.propTypes = {
  showModal: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    showModal: state.frontend.modals.showLoginModal,
    submitting: state.form['login-form']
        ? state.form['login-form'].submitting === true : false
  }
};

LoginModalPill = connect(mapStateToProps)(LoginModalPill);

export default withRouter(LoginModalPill);
