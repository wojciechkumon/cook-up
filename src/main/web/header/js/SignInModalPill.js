import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {submit} from "redux-form";
import {withRouter} from "react-router-dom";
import {hideSignInModal, showSignInModal} from "./actions/actions";
import "../style/modals.scss";
import SignInForm from "./SignInForm";
import {handleSubmit} from "./signInSubmitter";

class SignInModalPill extends Component {

  openSignInModal = () => {
    this.props.dispatch(showSignInModal());
  };

  closeSignInModal = () => {
    this.props.dispatch(hideSignInModal());
  };

  signIn = () => {
    this.props.dispatch(submit('sign-in-form'));
  };

  render() {
    const {submitting, showModal, dispatch, history} = this.props;
    return (
        <li>
          <a onClick={this.openSignInModal}>Sign In</a>
          <Modal show={showModal}
                 onHide={this.closeSignInModal}>
            <Modal.Header closeButton>
              <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignInForm onSubmit={handleSubmit(dispatch, history)}/>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" disabled={submitting} onClick={this.signIn}>Submit</Button>
              <Button disabled={submitting} onClick={this.closeSignInModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </li>
    );
  }
}

SignInModalPill.propTypes = {
  showModal: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    showModal: state.frontend.modals.showSignInModal,
    submitting: state.form['sign-in-form']
        ? state.form['sign-in-form'].submitting === true : false
  }
};

SignInModalPill = connect(mapStateToProps)(SignInModalPill);

export default withRouter(SignInModalPill);
