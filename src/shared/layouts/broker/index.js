import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Row, Col, Button, Table, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import MainLayout from '../main/MainLayout';
import CreateCertificate from '../../components/create_certificate/CreateCertificate';
import {
  submittingCertificate,
  viewingCertificate,
  gettingCertificatesSummary,
} from '../../actions/certificates';
import { gettingPoliciesUUID } from '../../actions/policies';

class BrokerIndex extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
        className: 'table__column',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        className: 'table__column',
      },
      {
        title: 'Certificate Number',
        dataIndex: 'certificate_number',
        key: 'certificate_number',
        className: 'table__column',
      },
      {
        title: 'Effective Date',
        dataIndex: 'effective_date',
        key: 'effective_date',
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
    ];
  }
  state = {
    loading: false,
    visible: false,
  };

  componentDidMount() {
    this.props.gettingCertificates(this.props.data.user_id);
  }

  handleViewDetail = (certificateid, userid) => {
    this.props.viewCertificate(certificateid, userid);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
    this.props.gettingPoliciesUUID();
  };

  handleOk = certificate => {
    const { email, policies, effectiveDate } = certificate;
    const { user_id } = this.props.data;
    this.setState({ loading: true });
    this.props.storeCertificate.bind(this);
    this.props
      .storeCertificate({ email, policies, effectiveDate, user_id })
      .then(() => {
        this.setState({ loading: false, visible: false });
      })
      .catch(() => {
        this.setState({ loading: false });
        this.errorSubmit();
      });
  };

  handleCancel = () => {
    setTimeout(() => {
      this.setState({ visible: false });
    }, 10);
  };

  errorSubmit = () => {
    Modal.error({
      title: 'An error has ocurred',
      content: 'Please try again',
    });
  };

  render() {
    const { loadingCertificates } = this.props;
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
              + Certificate
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
            dataSource={this.props.certificates_list}
            pagination={false}
            loading={loadingCertificates}
          />
          <CreateCertificate
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

BrokerIndex.propTypes = {
  gettingCertificates: PropTypes.func.isRequired,
  viewCertificate: PropTypes.func.isRequired,
  storeCertificate: PropTypes.func.isRequired,
  loadingCertificates: PropTypes.bool,
  certificates_list: PropTypes.array,
  data: PropTypes.object,
  user_id: PropTypes.string,
};

const mapStateToProps = state => ({
  ...state.certificates,
  ...state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    storeCertificate: certificate =>
      dispatch(submittingCertificate(certificate)),
    viewCertificate: (certificateid, userid) =>
      dispatch(viewingCertificate(certificateid, userid)),
    gettingCertificates: userid => dispatch(gettingCertificatesSummary(userid)),
    gettingPoliciesUUID: () => dispatch(gettingPoliciesUUID()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrokerIndex);
