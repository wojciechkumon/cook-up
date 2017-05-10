import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "../style/Header.scss";
import {Col, Grid, Row} from "react-bootstrap";
import SignInModalPill from "./SignInModalPill";
import LoginModalPill from "./LoginModalPill";
import LogoutPill from "./LogoutPill";

class Header extends Component {

  render() {
    const {loggedIn} = this.props.user;
    return (
      <div className="Header">
        <Grid>
          <Row className="show-grid">
            <Col md={4}>
              <h1>Cook up</h1>
            </Col>
            <Col md={8}>
              <ul className="nav nav-pills">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/">Finder</Link></li>

                {loggedIn && <li><Link to="/addRecipe">Add recipe</Link></li>}
                {loggedIn && <li><Link to="/me">Me</Link></li>}
                {loggedIn && <LogoutPill/>}
                {!loggedIn && <SignInModalPill/>}
                {!loggedIn && <LoginModalPill/>}
              </ul>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
    id: PropTypes.number
  }).isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth
  }
};

Header = connect(mapStateToProps)(Header);

export default Header;