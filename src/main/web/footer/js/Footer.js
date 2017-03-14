import React, {Component} from 'react';
import '../style/Footer.scss';
import {Grid, Col, Row} from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
        <div className="Footer">
          <Grid>
            <Row className="show-grid">
              <Col md={6}>
                <h1>Footer</h1>
              </Col>
              <Col md={6}>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default Footer;