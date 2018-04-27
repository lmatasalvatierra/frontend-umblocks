import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Table, Input, Divider } from 'antd';
import { connect } from 'react-redux';
import MainLayout from '../main/MainLayout';
import CreatePolicy from '../../components/create_policy/CreatePolicy';
import { submittingPolicy } from '../../actions/carrier';

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    className: 'table__column',
  },
  {
    title: 'Insurance Type',
    dataIndex: 'insurance_type',
    key: 'insurance_type',
    className: 'table__column',
  },
  {
    title: 'Policy Number',
    dataIndex: 'policy_number',
    key: 'policy_number',
    className: 'table__column',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    className: 'table__column',
  },
  {
    title: 'Effective Date',
    dataIndex: 'effective_date',
    key: 'effective_date',
    className: 'table__column',
  },
  {
    title: 'Expiration Date',
    dataIndex: 'expiration_date',
    key: 'expiration_date',
    className: 'table__column',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">View</a>
        <Divider type="vertical" />
        <a href="#">Cancel</a>
      </span>
    ),
    className: 'table__column',
  },
];

class CarrierIndex extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = policy => {
    const { user_id } = this.props.data;
    this.setState({ loading: true });
    this.props.storePolicy({...policy, user_id });
    this.setState({ loading: false, visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <MainLayout>
        <Row className="table-header">
          <Col span={12}>
            <h2 className="table-header__title">Summary</h2>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              className="table-header__add-button"
              type="primary"
              size="large"
              onClick={this.showModal}
            >
              + Policy
            </Button>
          </Col>
        </Row>
        <div className="table-menu__search-bar">
          <Input placeholder="Search Certificate by email" size="large" />
        </div>
        <Table
          className="table"
          columns={columns}
          dataSource={this.props.policies_list}
          pagination={false}
        />
        <CreatePolicy
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          loading={this.state.loading}
        />
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  ...state.carrier,
  ...state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    storePolicy: policy => dispatch(submittingPolicy(policy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierIndex);
