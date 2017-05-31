import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Finder from "../../finder/js/Finder";
import url from "url";
import {showLoginModal} from "../../header/js/actions/actions";

class LoginPage extends Component {

  componentDidMount() {
    this.props.dispatch(showLoginModal());
  }

  componentWillReceiveProps(nextProps) {
    const {loggedIn} = nextProps;
    if (loggedIn) {
      this.redirect();
    }
  }

  redirect = () => {
    const {history} = this.props;
    const redirectLoc = url.parse(window.location.href, true).query.redirect;
    if (history && redirectLoc) {
      history.push(redirectLoc);
    }
  };

  render() {
    return (
      <div>
        <Finder/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
};

LoginPage = connect(mapStateToProps)(LoginPage);

export default withRouter(LoginPage);
