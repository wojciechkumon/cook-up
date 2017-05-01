import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import hoistStatics from "hoist-non-react-statics";
import url from "url";

const defaults = {
  failureRedirectPath: '/login',
  redirectQueryParamName: 'redirect',
  wrapperDisplayName: 'WithAuthWrapper',
  predicate: x => x === {},
  allowRedirectBack: true,
  propMapper: ({authData, failureRedirectPath, ...otherProps}) => ({
    authData, ...otherProps
  })
};

export const WithAuthWrapper = (args) => {
  const {
    authSelector, failureRedirectPath,
    wrapperDisplayName, predicate, allowRedirectBack, redirectQueryParamName, propMapper
  } = {
    ...defaults,
    ...args
  };

  const isAuthorized = (authData) => predicate(authData);

  const createRedirect = (location, redirect, redirectPath) => {
    const redirectLoc = url.parse(redirectPath, true);

    let search;
    const canRedirect = typeof allowRedirectBack === 'function' ? allowRedirectBack(location,
      redirectPath) : allowRedirectBack;

    if (canRedirect) {
      search =
        redirectQueryParamName + '=' + `${location.pathname}${location.search}${location.hash}`;
    } else {
      search = '';
    }

    redirect({
      pathname: redirectLoc.pathname,
      hash: redirectLoc.hash,
      search
    })
  };

  const locationShape = PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  });

  function wrapComponent(DecoratedComponent) {
    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    @connect(
      (state, ownProps) => {
        return {
          authData: authSelector(state, ownProps),
          failureRedirectPath
        }
      }
    )
    class WithAuthWrapper extends Component {

      static displayName = `${wrapperDisplayName}(${displayName})`;

      componentWillMount() {
        if (!isAuthorized(this.props.authData)) {
          createRedirect(this.props.location, this.redirect,
            this.props.failureRedirectPath)
        }
      }

      componentWillReceiveProps(nextProps) {
        const willBeAuthorized = isAuthorized(nextProps.authData);
        const wasAuthorized = isAuthorized(this.props.authData);

        if ((wasAuthorized && !willBeAuthorized) || !willBeAuthorized) {
          createRedirect(nextProps.location, this.redirect,
            nextProps.failureRedirectPath)
        }
      }

      redirect = (location) => this.props.history.push(location);

      render() {
        const {authData} = this.props;
        if (isAuthorized(authData)) {
          return <DecoratedComponent {...propMapper(this.props)} />
        } else {
          return null;
        }
      }
    }

    return hoistStatics(WithAuthWrapper, DecoratedComponent)
  }

  WithAuthWrapper.propTypes = {
    failureRedirectPath: PropTypes.string.isRequired,
    location: locationShape.isRequired,
    redirect: PropTypes.func,
    authData: PropTypes.object
  };

  wrapComponent.onEnter = (store, nextState, replace) => {
    const authData = authSelector(store.getState(), nextState);

    if (!isAuthorized(authData)) {
      const redirectPath = typeof failureRedirectPath === 'function' ? failureRedirectPath(
        store.getState(), nextState) : failureRedirectPath;
      createRedirect(nextState.location, replace, redirectPath);
    }
  };

  return wrapComponent;
};