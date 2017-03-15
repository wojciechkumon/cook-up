import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import "../../lib/css/bootstrap.min.css";
import "../style/App.scss";
import "../img/favicon.png";
import LayoutWrapper from "./LayoutWrapper";
import Finder from "../../finder/js/Finder";
import About from "../../about/js/About";

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={LayoutWrapper}>
        <IndexRoute component={Finder}/>
        <Route path="/about" component={About}/>
      </Route>
    </Router>,
    document.getElementById('react-root')
);
