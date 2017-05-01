import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import hoistStatics from "hoist-non-react-statics";
import isEmpty from "lodash.isempty";
import url from "url";

const defaults = {
  failureRedirectPath: '/login',
  redirectQueryParamName: 'redirect',
  wrapperDisplayName: 'WithAuthWrapper',
  predicate: x => !isEmpty(x),
  allowRedirectBack: true,
  propMapper: ({redirect, authData, failureRedirectPath, ...otherProps}) => ({
    redirect,
    authData, ...otherProps
  })
};

export const WithAuth = (args) => {
  const {
    authSelector, failureRedirectPath,
    wrapperDisplayName, predicate, allowRedirectBack, redirectHandler, redirectQueryParamName, propMapper
  } = {
    ...defaults,
    ...args
  };

  const isAuthorized = (authData) => predicate(authData);

  const createRedirect = (location, redirect, redirectPath) => {
    const redirectLoc = url.parse(redirectPath, true);

    let query;
    const canRedirect = typeof allowRedirectBack === 'function' ? allowRedirectBack(location,
      redirectPath) : allowRedirectBack;

    if (canRedirect) {
      query = {[redirectQueryParamName]: `${location.pathname}${location.search}${location.hash}`}
    } else {
      query = {}
    }

    query = {
      ...query,
      ...redirectLoc.query
    };

    redirect({
      pathname: redirectLoc.pathname,
      hash: redirectLoc.hash,
      query
    })
  };

  const locationShape = PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  });

  // Wraps the component that needs the auth enforcement
  function wrapComponent(DecoratedComponent) {
    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    const mapDispatchToProps = (dispatch) => {
      if (redirectHandler !== undefined) {
        return {redirect: (args) => redirectHandler(args)}
        // return { redirect: (args) => dispatch(redirectAction(args)) }
      } else {
        return {}
      }
    };

    @connect(
      (state, ownProps) => {
        return {
          authData: authSelector(state, ownProps),
          failureRedirectPath: typeof failureRedirectPath === 'function' ? failureRedirectPath(
            state, ownProps) : failureRedirectPath
        }
      },
      mapDispatchToProps,
    )
    class WithAuth extends Component {

      static displayName = `${wrapperDisplayName}(${displayName})`;

      static propTypes = {
        failureRedirectPath: PropTypes.string.isRequired,
        location: locationShape.isRequired,
        redirect: PropTypes.func,
        authData: PropTypes.object
      };

      static contextTypes = {
        // Only used if no redirectHandler specified
        router: PropTypes.object
      };

      componentWillMount() {
        if (!isAuthorized(this.props.authData)) {
          createRedirect(this.props.location, this.getRedirectFunc(this.props),
            this.props.failureRedirectPath)
        }
      }

      componentWillReceiveProps(nextProps) {
        const willBeAuthorized = isAuthorized(nextProps.authData);
        const wasAuthorized = isAuthorized(this.props.authData);

        // Redirect if:
        if ( // 1. Was authorized, but no longer
        (wasAuthorized && !willBeAuthorized) ||
        // 2. Was not authorized and authenticating
        !willBeAuthorized
        ) {
          createRedirect(nextProps.location, this.getRedirectFunc(nextProps),
            nextProps.failureRedirectPath)
        }
      }

      getRedirectFunc = ({redirect}) => {
        if (redirect) {
          return redirect
        } else {
          if (!this.context.router.replace) {
            /* istanbul ignore next sanity */
            throw new Error(
              `You must provide a router context (or use React-Router 2.x) if not passing a redirectHandler to ${wrapperDisplayName}`)
          } else {
            return this.context.router.replace
          }
        }
      };

      render() {
        // Allow everything but the replace action creator to be passed down
        // Includes route props from React-Router and authData
        const {authData} = this.props;
        if (isAuthorized(authData)) {
          return <DecoratedComponent {...propMapper(this.props)} />
        } else {
          return null;
        }
      }
    }

    return hoistStatics(WithAuth, DecoratedComponent)
  }

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