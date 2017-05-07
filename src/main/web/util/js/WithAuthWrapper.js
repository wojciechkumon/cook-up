import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import hoistStatics from "hoist-non-react-statics";
import url from "url";

const defaults = {
  LoadingComponent: () => null,
  failureRedirectPath: '/login',
  redirectQueryParamName: 'redirect',
  wrapperDisplayName: 'WithAuthWrapper',
  authSelector: state => null,
  predicate: x => x === {},
  authenticatingSelector: () => false,
  allowRedirectBack: true,
  propMapper: ({authData, failureRedirectPath, ...otherProps}) => ({
    authData, ...otherProps
  })
};

export const WithAuthWrapper = (args) => {
  const {
    authSelector, failureRedirectPath, authenticatingSelector, LoadingComponent,
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
          failureRedirectPath,
          isAuthenticating: authenticatingSelector(state, ownProps)
        }
      }
    )
    class WithAuthWrapper extends Component {

      static displayName = `${wrapperDisplayName}(${displayName})`;

      componentWillMount() {
        if (!this.props.isAuthenticating && !isAuthorized(this.props.authData)) {
          createRedirect(this.props.location, this.redirect, this.props.failureRedirectPath)
        }
      }

      componentWillReceiveProps(nextProps) {
        const willBeAuthorized = isAuthorized(nextProps.authData);
        const willBeAuthenticating = nextProps.isAuthenticating;
        const wasAuthorized = isAuthorized(this.props.authData);
        const wasAuthenticating = this.props.isAuthenticating;

        if (willBeAuthenticating) {
          return;
        }

        if ((wasAuthorized && !willBeAuthorized) || (wasAuthenticating && !willBeAuthorized)) {
          createRedirect(nextProps.location, this.redirect,
            nextProps.failureRedirectPath);
        }
      }

      redirect = (location) => this.props.history.push(location);

      render() {
        const {authData, isAuthenticating} = this.props;
        if (isAuthorized(authData)) {
          return <DecoratedComponent {...propMapper(this.props)} />
        } else if (isAuthenticating) {
          return <LoadingComponent {...propMapper(this.props)} />
        }
        return null;
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
    const isAuthenticating = authenticatingSelector(store.getState(), nextState);

    if (!isAuthorized(authData) && !isAuthenticating) {
      const redirectPath = typeof failureRedirectPath === 'function' ? failureRedirectPath(
        store.getState(), nextState) : failureRedirectPath;
      createRedirect(nextState.location, replace, redirectPath);
    }
  };

  return wrapComponent;
};