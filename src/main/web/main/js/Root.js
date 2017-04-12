import React, {Component} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {Provider} from "react-redux";
import "../../lib/css/bootstrap.min.css";
import "../style/App.scss";
import "../img/favicon.png";
import LayoutWrapper from "./LayoutWrapper";
import Finder from "../../finder/js/Finder";
import About from "../../about/js/About";

const history = createBrowserHistory()

class Root extends Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <Switch>
            <LayoutWrapper>
              <Route exact path="/" component={Finder}/>
              <Route path="/about" component={About}/>
            </LayoutWrapper>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;