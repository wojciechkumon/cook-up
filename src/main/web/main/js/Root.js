import React, {Component} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {Provider} from "react-redux";
import {WithAuthWrapper} from "../../util/js/WithAuthWrapper";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/scss/font-awesome.scss";
import "../style/App.scss";
import "../img/favicon.png";
import LayoutWrapper from "./LayoutWrapper";
import Finder from "../../finder/js/Finder";
import About from "../../about/js/About";
import Recipe from "../../recipe/js/Recipe";
import Profile from "../../profile/js/Profile";
import MePage from "../../me/js/MePage";
import LoginPage from "../../loginPage/js/LoginPage";
import NotFoundPage from "../../notFoundPage/js/NotFoundPage";

const history = createBrowserHistory();

const WithAuth = WithAuthWrapper({
  authSelector: state => state.user,
  predicate: (authData) => authData.loggedIn
});

class Root extends Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <LayoutWrapper>
            <Switch>
              <Route exact path="/" component={Finder}/>
              <Route path="/about" component={About}/>
              <Route path="/recipe/:recipeId" component={Recipe}/>
              <Route path="/user/:userId" component={Profile}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/me" component={WithAuth(MePage)}/>
              <Route path="*" component={NotFoundPage}/>
            </Switch>
          </LayoutWrapper>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;