import React, { Component } from 'react';

import LoginForm from '../login_form/LoginForm'

class Access extends Component {
  render() {
    return(
      <div className="access">
        <h1 className="access__title">Access</h1>
        <div className="access__form">
          <LoginForm />
        </div>
      </div>
    )
  }
}

export default Access
