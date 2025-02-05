import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NoMatch from '../layouts/no_match/NoMatch';
import PrivateRoute from '../components/private_route/PrivateRoute';
import Login from '../layouts/login/Login';
import OwnerIndex from '../layouts/owner/index';
import BrokerIndex from '../layouts/broker/index';
import CarrierIndex from '../layouts/carrier/index';
import PolicyView from '../layouts/policy/Policy';
import CertificateView from '../layouts/certificate/Certificate';
import CookieAuth from '../components/cookie_auth/CookieAuth';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.isOwner = this.isOwner.bind(this);
    this.isCarrier = this.isCarrier.bind(this);
    this.isBroker = this.isBroker.bind(this);
  }
  isOwner() {
    const authValue =
      this.props && this.props.data && this.props.data.is_authenticated;
    const typeValue =
      this.props && this.props.data && this.props.data.user_type;
    return authValue && typeValue === 'owner';
  }

  isCarrier() {
    const authValue = this.props.data && this.props.data.is_authenticated;
    const typeValue = this.props.data && this.props.data.user_type;
    return authValue && typeValue === 'carrier';
  }

  isBroker() {
    const authValue = this.props.data && this.props.data.is_authenticated;
    const typeValue = this.props.data && this.props.data.user_type;
    return authValue && typeValue === 'broker';
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={CookieAuth} />
        <Route path="/login" component={Login} />
        <PrivateRoute
          path="/owner/:owner/certificate/:certificateid"
          isAuthenticated={this.isOwner}
          component={CertificateView}
        />
        <PrivateRoute
          path="/owner/:id"
          isAuthenticated={this.isOwner}
          component={OwnerIndex}
        />
        <PrivateRoute
          path="/broker/:broker/certificate/:certificateid"
          isAuthenticated={this.isBroker}
          component={CertificateView}
        />
        <PrivateRoute
          path="/broker/:id"
          isAuthenticated={this.isBroker}
          component={BrokerIndex}
        />
        <PrivateRoute
          path="/carrier/:carrierid/policy/:policyid"
          isAuthenticated={this.isCarrier}
          component={PolicyView}
        />
        <PrivateRoute
          path="/carrier/:id"
          isAuthenticated={this.isCarrier}
          component={CarrierIndex}
        />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
});

export default withRouter(connect(mapStateToProps)(Routes));
