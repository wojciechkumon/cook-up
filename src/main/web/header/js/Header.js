import React, {Component} from 'react';
import '../style/Header.scss';
import {Grid, Col, Row} from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
        <div className="Header">
          <Grid>
            <Row className="show-grid">
              <Col md={6}>
                <h1>Cook up</h1>
              </Col>
              <Col md={6}>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default Header;