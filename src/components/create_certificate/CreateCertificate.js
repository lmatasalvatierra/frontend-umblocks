import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, DatePicker } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;


class CreateCertificate extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      const certificate = (this.props.form.getFieldsValue());
      this.props.handleOk(certificate);
    });
    this.props.form.resetFields();
  }

  render() {
    const { visible, loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    const nameProps = getFieldDecorator('name');
    const emailProps = getFieldDecorator('email');
    const effectiveProps = getFieldDecorator('effectiveDate');
    const certificateProps = getFieldDecorator('certificateNumber');

    return (
      <div>
        <Modal
          width={750}
          visible={visible}
          title="Add Certificate"
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
              Add Certificate
            </Button>
          ]}
        >
          <Form className="form" onSubmit={this.handleSubmit}>
            <FormItem label="Name" style={{ marginBottom: 20 }}>
              {
                nameProps(
                  <Input size="large" placeholder="John Smith"/>
                )
              }
            </FormItem>
            <FormItem label="Email" style={{ marginBottom: 20 }}>
              {
                emailProps(
                  <Input size="large" placeholder="john@cw.com"/>
                )
              }
            </FormItem>
            <FormItem label="Effective Date" style={{ marginBottom: 20 }}>
              {
                effectiveProps(
                  <DatePicker size="large" />
                )
              }
            </FormItem>
            <FormItem label="Certificate Number" style={{ marginBottom: 20 }}>
              {
                certificateProps(
                  <Input size="large" placeholder="#312321432"/>
                )
              }
            </FormItem>
            <FormItem>
              <Button size="large" type="primary">
                Add Policy
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default createForm()(CreateCertificate);
