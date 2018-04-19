import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, DatePicker, Cascader, Radio } from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const options = [
  {
    value: 'Business Owners Policy',
    label: 'Business Owners Policy',
  },
  {
    value: 'General Liability',
    label: 'General Liability',
  },
  {
    value: 'Workers Compensation',
    label: 'Workers Compensation',
  },
];

class CreatePolicy extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields(errors => {
      if (errors) {
        return false;
      }
      const policy = this.props.form.getFieldsValue();
      this.props.handleOk(policy);
    });
    this.props.form.resetFields();
  };

  render() {
    const { visible, loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    const nameProps = getFieldDecorator('name');
    const emailProps = getFieldDecorator('email');
    const effectiveProps = getFieldDecorator('effectiveDate');
    const expirationProps = getFieldDecorator('expirationDate');
    const insuranceProps = getFieldDecorator('insuranceType');
    const limitsProps = getFieldDecorator('limits');
    const aggregatedProps = getFieldDecorator('aggregatedLimits');

    return (
      <div>
        <Modal
          width={750}
          visible={visible}
          title="Add Policy"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[
            <Button onClick={this.props.handleCancel} key="back">
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleSubmit}
            >
              Add Policy
            </Button>,
          ]}
        >
          <Form className="form" onSubmit={this.handleSubmit}>
            <FormItem label="Name" style={{ marginBottom: 20 }}>
              {nameProps(<Input size="large" placeholder="John Smith" />)}
            </FormItem>
            <FormItem label="Email" style={{ marginBottom: 20 }}>
              {emailProps(<Input size="large" placeholder="john@cw.com" />)}
            </FormItem>
            <FormItem label="Effective date" style={{ marginBottom: 20 }}>
              {effectiveProps(<DatePicker size="large" />)}
            </FormItem>
            <FormItem label="Expiration date" style={{ marginBottom: 20 }}>
              {expirationProps(<DatePicker size="large" />)}
            </FormItem>
            <FormItem label="Insurance Type" style={{ marginBottom: 20 }}>
              {insuranceProps(<Cascader size="large" options={options} />)}
            </FormItem>
            <FormItem
              label="Limits per Occurrence"
              style={{ marginBottom: 20 }}
            >
              {limitsProps(
                <RadioGroup>
                  <RadioButton value="a">$1M</RadioButton>
                  <RadioButton value="b">$2M</RadioButton>
                  <RadioButton value="c">$3M</RadioButton>
                  <RadioButton value="d">$4M</RadioButton>
                </RadioGroup>,
              )}
            </FormItem>
            <FormItem label="Aggregated Limits" style={{ marginBottom: 20 }}>
              {aggregatedProps(
                <RadioGroup>
                  <RadioButton value="a">$1M</RadioButton>
                  <RadioButton value="b">$2M</RadioButton>
                  <RadioButton value="c">$3M</RadioButton>
                  <RadioButton value="d">$4M</RadioButton>
                </RadioGroup>,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default createForm()(CreatePolicy);
