import React, {Component}  from "react";
import PropTypes from 'prop-types';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import {Provider} from 'react-redux';
import "../../lib/css/bootstrap.min.css";
import "../style/App.scss";
import "../img/favicon.png";
import LayoutWrapper from "./LayoutWrapper";
import Finder from "../../finder/js/Finder";
import About from "../../about/js/About";

class Root extends Component {

  render() {
    return (
        <Provider store={this.props.store}>
          <Router history={browserHistory}>
            <Route path="/" component={LayoutWrapper}>
              <IndexRoute component={Finder}/>
              <Route path="/about" component={About}/>
            </Route>
          </Router>
        </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;