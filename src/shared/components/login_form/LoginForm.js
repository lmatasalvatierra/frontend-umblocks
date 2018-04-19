import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { loginUser } from '../../actions/auth';

const FormItem = Form.Item;
const createForm = Form.create;

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (username, password) => dispatch(loginUser(username, password)),
  };
};

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(errors => {
      if (errors) {
        return false;
      }
      const values = this.props.form.getFieldsValue();
      this.props.onSubmit(values.userName, values.password);
    });
  };

  loginFailedCallback = email => {
    const { setFields } = this.props.form;
    const newValue = {
      userName: {
        value: email,
      },
      password: {
        value: '',
      },
    };
    setFields(newValue);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const usernameProps = getFieldDecorator('userName', {
      rules: [{ required: true, message: 'Please input your username!' }],
    });
    const passwordProps = getFieldDecorator('password', {
      rules: [{ required: true, message: 'Please input your Password!' }],
    });
    return (
      <Form className="form" onSubmit={this.handleSubmit}>
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
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default connect(null, mapDispatchToProps)(createForm()(LoginForm));
