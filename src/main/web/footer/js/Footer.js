import React, {Component} from "react";
import "../style/Footer.scss";
import {Col, Grid, Row} from "react-bootstrap";

class Footer extends Component {
  render() {
    const year = new Date().getFullYear();

    return (
        <footer className="Footer">
          <Grid>
            <Row>
              <Col md={4}>
                <p>Cook up</p>
              </Col>
              <Col md={4}>
                <p>© {year} Copyright CookUp</p>
              </Col>
              <Col md={4}>
                <p>Contact</p>
              </Col>
            </Row>
          </Grid>
        </footer>
    );
  }
}

export default Footer;