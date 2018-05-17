import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to={'/'} />}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.func,
};

const WrappedPrivateRoute = withRouter(PrivateRoute);

export { WrappedPrivateRoute as default };
