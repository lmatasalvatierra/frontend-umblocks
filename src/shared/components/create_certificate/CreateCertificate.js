import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  Icon,
  AutoComplete,
} from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;
let keyId = 1;

class CreateCertificate extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(errors => {
      if (errors) {
        return false;
      }
      const certificate = this.props.form.getFieldsValue();
      this.props.handleOk(certificate);
    });
    this.props.form.resetFields();
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keyId);
    keyId += 1;
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { visible, loading, policies_uuid } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const emailProps = getFieldDecorator('email', {
      rules: [{ required: true, message: 'Required field' }],
    });
    const effectiveProps = getFieldDecorator('effectiveDate', {
      rules: [{ required: true, message: 'Required field' }],
    });

    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');
    const policies = keys.map((k, index) => {
      return (
        <FormItem label={index === 0 ? 'Policies' : ''} required key={k}>
          {getFieldDecorator(`policies[${k}]`, {
            rules: [{ required: true, message: 'Required field' }],
          })(
            <AutoComplete
              dataSource={policies_uuid}
              size="large"
              style={{ width: '90%', marginRight: '8px' }}
              filterOption={(inputValue, option) =>
                option.key.indexOf(inputValue) > -1}
              placeholder="Policy Number"
            />,
          )}
          {keys.length > 1 ? (
            <Icon
              style={{ fontSize: 22 }}
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <div>
        <Modal
          width={750}
          visible={visible}
          title="Add Certificate"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button size="large" onClick={this.props.handleCancel} key="back">
              Return
            </Button>,
            <Button
              size="large"
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleSubmit}
            >
              Add Certificate
            </Button>,
          ]}
        >
          <Form className="form" onSubmit={this.handleSubmit}>
            <FormItem label="Email" style={{ marginBottom: 20 }}>
              {emailProps(<Input size="large" placeholder="john@cw.com" />)}
            </FormItem>
            <FormItem label="Effective Date" style={{ marginBottom: 20 }}>
              {effectiveProps(<DatePicker size="large" />)}
            </FormItem>
            {policies}
            <FormItem>
              <Button type="primary" onClick={this.add}>
                <Icon type="plus" /> Policy
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

CreateCertificate.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  form: PropTypes.object,
  validateFields: PropTypes.func,
  getFieldsValue: PropTypes.func,
  getFieldDecorator: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  policies_uuid: PropTypes.array,
};

const mapStateToProps = state => ({
  ...state.policies,
});

export default connect(mapStateToProps)(createForm()(CreateCertificate));
