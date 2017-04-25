import React from "react";
import {render} from "react-dom";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import Root from "./Root";
import cookUpApp from "./reducers/cookUpApp";

const middleware = process.env.NODE_ENV !== 'production' ?
    applyMiddleware(thunkMiddleware, createLogger()) :
    applyMiddleware(thunkMiddleware);

const store = createStore(cookUpApp, middleware);

render(
  <Root store={store}/>,
  document.getElementById('react-root')
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const RootContainer = require('./Root').default;
    render(
        <RootContainer store={ store }/>,
        document.getElementById('react-root')
    );
  });
}