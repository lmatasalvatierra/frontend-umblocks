import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import MainLayout from '../main/MainLayout';
import ListCertificate from '../../components/list_certificate/ListCertificate';
import ListPolicy from '../../components/list_policy/ListPolicy';

class CertificateView extends Component {
  render() {
    const { general_information, policies } = this.props;
    return (
      <MainLayout>
        <Row className="table-header">
          <Col span={12}>
            <h2 className="table-header__title">Certificate</h2>
          </Col>
        </Row>
        <div className="table">
          <div className="table__background">
            <ListCertificate certificate={general_information} />
          </div>
          {policies.map(policy => (
            <div className="table__background">
              <ListPolicy policy={policy} />
            </div>
          ))}
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  ...state.certificates,
});

export default connect(mapStateToProps, null)(CertificateView);
