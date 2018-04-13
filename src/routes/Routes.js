import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NoMatch from '../layouts/no_match/NoMatch'
import { Redirect } from 'react-router-dom';
import Login from '../layouts/login/Login';
import OwnerIndex from '../layouts/owner/index'
import BrokerIndex from '../layouts/broker/index'
import CarrierIndex from '../layouts/carrier/index'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={() => (<Redirect to={'/login'}/>)} />
        <Route path="/login" component={Login} />
        <Route path="/owner" component={OwnerIndex} />
        <Route path="/broker" component={BrokerIndex} />
        <Route path="/carrier" component={CarrierIndex} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default Routes;
