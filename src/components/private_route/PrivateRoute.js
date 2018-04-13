import React from 'react';
import { withRouter, Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated: isAuthenticated, ...rest }) => (
  <Route {...rest}
    render={(props) =>
      (
        isAuthenticated ?
          <Component {...props} />
          : <Redirect to={'/'} />
      )} />
)

export default withRouter(PrivateRoute);
