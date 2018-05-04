import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Table, Input, Divider } from 'antd';
import { connect } from 'react-redux';
import MainLayout from '../main/MainLayout';
import CreatePolicy from '../../components/create_policy/CreatePolicy';
import {
  submittingPolicy,
  viewingPolicy,
  gettingPoliciesSummary,
} from '../../actions/policies';

class CarrierIndex extends Component {
  constructor(props) {
    super(props);
    this.columns = [
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
            <a
              onClick={() =>
                this.handleViewDetail(
                  record.policy_number,
                  this.props.data.user_id,
                )}
            >
              View
            </a>
            <Divider type="vertical" />
            <a>Cancel</a>
          </span>
        ),
        className: 'table__column',
      },
    ];
  }

  state = {
    loading: false,
    visible: false,
  };

  componentDidMount() {
    this.props.gettingPolicies(this.props.data.user_id);
  }

  handleViewDetail = (policyid, userid) => {
    this.props.viewPolicy(policyid, userid);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = policy => {
    const { user_id } = this.props.data;
    this.setState({ loading: true });
    this.props.storePolicy({ ...policy, user_id });
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
        <div className="layout__background">
          <Table
            className="table"
            columns={this.columns}
            dataSource={this.props.policies_list}
            pagination={false}
          />
          <CreatePolicy
            handleOk={this.handleOk}
            handleCancel={this.handleCancel}
            visible={this.state.visible}
            loading={this.state.loading}
          />
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  ...state.policies,
  ...state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    storePolicy: policy => dispatch(submittingPolicy(policy)),
    viewPolicy: (policyid, userid) => dispatch(viewingPolicy(policyid, userid)),
    gettingPolicies: userid => dispatch(gettingPoliciesSummary(userid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarrierIndex);
