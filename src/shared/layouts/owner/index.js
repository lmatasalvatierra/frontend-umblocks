import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Table } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MainLayout from '../main/MainLayout';
import {
  gettingCertificatesSummaryOwner,
  viewingCertificate
} from '../../actions/certificates';

class OwnerIndex extends Component {
  constructor(props) {
    super(props);
    this.columns = [
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
            <a
              onClick={() =>
                this.handleViewDetail(
                  record.certificate_number,
                  this.props.data.user_id,
              )}
            >
              View details
            </a>
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
  }

  handleViewDetail = (certificateid, userid) => {
    this.props.viewCertificate(certificateid, userid);
  };

  componentDidMount() {
    this.props.gettingCertificates(this.props.data.user_id);
  }

  render() {
    const { certificates_list } = this.props;
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
            columns={this.columns}
            dataSource={certificates_list}
            pagination={false}
          />
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  ...state.certificates,
  ...state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    gettingCertificates: userid =>
      dispatch(gettingCertificatesSummaryOwner(userid)),
    viewCertificate: (certificateid, userid) =>
      dispatch(viewingCertificate(certificateid, userid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerIndex);
