import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatch from '../layouts/no_match/NoMatch'


class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default Routes;
