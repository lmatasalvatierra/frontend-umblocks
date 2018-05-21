import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { USER_LOGGED_IN } from '../../constant/ActionTypes';

const getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class CookieAuth extends Component {
  handleAuthentication = () => {
    const JSONUser = getCookie('user');
    if(JSONUser === '{}' || JSONUser === '') {
      return <Redirect to='/login'/>;
    } else {
      const user = JSON.parse(JSONUser);
      this.props.onVisit(user);
      return <Redirect to={`/${user.user_type}/${user.user_id}`} />;
    }
  };

  render() {
    return (
      <div>
        {this.handleAuthentication()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onVisit: user => dispatch({ type: USER_LOGGED_IN, payload: user }),
  };
};

export default connect(null, mapDispatchToProps)(CookieAuth);
