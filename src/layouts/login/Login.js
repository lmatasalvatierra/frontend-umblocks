import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Cover from '../../components/cover/Cover'
import Access from '../../components/access/Access'


class Login extends Component {
  render() {
    return(
      <div className="container-login">
        <Cover />
        <Access />
      </div>
    )
  }
}

export default Login
