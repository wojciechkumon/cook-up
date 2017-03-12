import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import LayoutWrapper from "./LayoutWrapper";
import CratesWrapper from "./crates/CratesWrapper";
import "./App.scss";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LayoutWrapper}>
      <IndexRoute component={CratesWrapper}/>
    </Route>
  </Router>,
  document.getElementById('react-root')
);
