import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import "./lib/css/bootstrap.min.css";
import "./App.scss";
import LayoutWrapper from "./LayoutWrapper";
import Finder from "./finder/Finder";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LayoutWrapper}>
      <IndexRoute component={Finder}/>
    </Route>
  </Router>,
  document.getElementById('react-root')
);
