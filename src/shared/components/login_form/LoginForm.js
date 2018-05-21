import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import 'antd/dist/antd.css';
import { loginUser } from '../../actions/auth';

const FormItem = Form.Item;
const createForm = Form.create;
const web3 = require('web3');

class LoginForm extends Component {
  state = {
    loading: false,
    loginError: false,
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(errors => {
      if (errors) {
        return false;
      }
      this.setState({ loading: true });
      const values = this.props.form.getFieldsValue();
      this.props.onSubmit.bind(this);
      this.props
        .onSubmit(
          values.userName,
          web3.utils.keccak256(values.password),
          values.remember,
        )
        .catch(() => {
          this.setState({ loading: false, loginError: true });
        });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loginError } = this.state;

    const usernameProps = getFieldDecorator('userName', {
      rules: [{ required: true, message: 'Please input your username!' }],
    });
    const passwordProps = getFieldDecorator('password', {
      rules: [{ required: true, message: 'Please input your Password!' }],
    });
    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        {loginError ? (
          <Alert
            style={{ marginBottom: 16 }}
            message="Please enter valid values"
            type="error"
            showIcon
          />
        ) : null}
        <FormItem style={{ marginBottom: 16 }}>
          {usernameProps(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </FormItem>
        <FormItem style={{ marginBottom: 8 }}>
          {passwordProps(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox
              style={{
                color: '#ffffff',
                textAlign: 'left',
                display: 'block',
                fontWeight: 100,
                fontSize: 16,
              }}
            >
              Remember me
            </Checkbox>,
          )}
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object,
  validateFields: PropTypes.func,
  getFieldsValue: PropTypes.func,
  getFieldDecorator: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (username, password, remember) => dispatch(loginUser(username, password, remember)),
  };
};

export default connect(null, mapDispatchToProps)(createForm()(LoginForm));
