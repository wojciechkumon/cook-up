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
              <div className="content">
                <div className="content-container">
                  <ul className="content-container-list">
                    <li className="content-container-list-item">
                      <div className="single-word">Find.</div>
                    </li>
                    <li className="content-container-list-item">
                      <div className="single-word">Cook.</div>
                    </li>
                    <li className="content-container-list-item">
                      <div className="single-word">Share.</div>
                    </li>
                  </ul>
                </div>
              </div>
            </Row>
            <Row className="show-grid">
              <h1>What do you have in your fridge?</h1>
            </Row>
          </Grid>
        </div>
    );
  }
}

export default Wrapper;