import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../style/Header.scss";
import {Col, Grid, Row} from "react-bootstrap";
import SignInModalPill from "./SignInModalPill";
import LoginModalPill from "./LoginModalPill";

class Header extends Component {

  render() {
    return (
        <div className="Header">
          <Grid>
            <Row className="show-grid">
              <Col md={4}>
                <h1>Cook up</h1>
              </Col>
              <Col md={8}>
                <ul className="nav nav-pills">
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/">Finder</Link>
                  </li>
                  <SignInModalPill/>
                  <LoginModalPill/>
                </ul>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default Header;