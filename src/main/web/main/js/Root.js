import React, {Component} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {Provider} from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/scss/font-awesome.scss";
import "../style/App.scss";
import "../img/favicon.png";
import LayoutWrapper from "./LayoutWrapper";
import Finder from "../../finder/js/Finder";
import About from "../../about/js/About";
import Recipe from "../../recipe/js/Recipe";

const history = createBrowserHistory();

class Root extends Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <Switch>
            <LayoutWrapper>
              <Route exact path="/" component={Finder}/>
              <Route path="/about" component={About}/>
              <Route path="/recipe/:recipeId" component={Recipe}/>
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