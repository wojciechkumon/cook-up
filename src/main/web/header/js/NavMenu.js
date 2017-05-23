import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "../style/NavMenu.scss";
import {Col, Grid, Row} from "react-bootstrap";
import SignInModalPill from "./SignInModalPill";
import LoginModalPill from "./LoginModalPill";
import LogoutPill from "./LogoutPill";

class NavMenu extends Component {

  render() {
    const {loggedIn} = this.props.user;
    return (
      <nav className="NavMenu">
        <Grid>
          <Row>
            <Col md={3}>
              <h1>Cook up</h1>
            </Col>
            <Col md={9}>
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
      </nav>
    );
  }
}

NavMenu.propTypes = {
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

NavMenu = connect(mapStateToProps)(NavMenu);

export default NavMenu;