import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Table } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MainLayout from '../main/MainLayout';

const columns = [
  {
    title: 'Certificate Number',
    dataIndex: 'certificate_number',
    key: 'certificate_number',
    className: 'table__column',
  },
  {
    title: 'Broker',
    dataIndex: 'broker',
    key: 'broker',
    className: 'table__column',
  },
  {
    title: 'Effective Date',
    dataIndex: 'effective_date',
    key: 'effective_date',
    className: 'table__column',
  },
  {
    title: 'COI',
    key: 'coi',
    render: (text, record) => (
      <span>
        <Link to={'/owner'}>View details</Link>
      </span>
    ),
    className: 'table__column',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">Share Certificate</a>
      </span>
    ),
    className: 'table__column',
  },
];

class OwnerIndex extends Component {
  render() {
    const { certificate_list } = this.props;
    return (
      <MainLayout>
        <Row className="table-header">
          <Col span={12}>
            <h2 className="table-header__title">Summary</h2>
          </Col>
        </Row>
        <div className="layout__background">
          <Table
            className="table"
            columns={columns}
            dataSource={certificate_list}
            pagination={false}
          />
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  ...state.owner,
});

export default connect(mapStateToProps)(OwnerIndex);
