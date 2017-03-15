import React, {Component} from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import '../style/Wrapper.scss';
import '../img/cook.jpg';

class Wrapper extends Component {
  render() {
    return (
        <div className="Wrapper">
          <Grid>
            <Row className="show-grid">
              <h1>What do you have in your fridge?</h1>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default Wrapper;