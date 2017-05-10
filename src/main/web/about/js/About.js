import React, {Component} from "react";
import "../style/About.scss";
import {Col, Grid, Row} from "react-bootstrap";

class About extends Component {
  render() {
    return (
        <div className="About">
          <Grid>
            <Row className="show-grid">
              <h1>Find a perfect recipe for today.</h1>
            </Row>
            <Row className="show-grid">
              <Col md={4}>
                <p>1 Type all products you have in your fridge and select the
                  perfect recipe for today.</p>
              </Col>
              <Col md={4}>
                <p>2 Develop your cooking skills, using only ingredients you
                  have in your kitchen. Enjoy your meal! </p>
              </Col>
              <Col md={4}>
                <p>3 Discover new recipes, add them to your favorite and cook
                  them again.</p>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default About;
