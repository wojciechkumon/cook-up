import React, {Component} from 'react';
import {Link} from "react-router";
import '../style/Header.scss';
import {Grid, Col, Row} from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
        <div className="Header">
          <Grid>
            <Row className="show-grid">
              <Col md={4}>
                <h1>Cook up</h1>
              </Col>
              <Col md={4}>
              </Col>
              <Col md={4}>
                <ul className="nav nav-pills">
                  <li>
                    <Link to="/about"
                          activeClassName="App-active-link">About</Link>
                  </li>
                  <li>
                    <Link to="/" activeClassName="App-active-link">Finder</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default Header;