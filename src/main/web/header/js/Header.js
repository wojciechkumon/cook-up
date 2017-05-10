import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";
import "../style/Header.scss";
import "../img/cook.jpg";

class Header extends Component {
  render() {
    return (
        <div className="Header">
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
          </Grid>
        </div>
    );
  }
}

export default Header;