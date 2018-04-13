import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Table, Input } from 'antd';
import { connect } from 'react-redux';
import MainLayout from '../main/MainLayout'
import CreateCertificate from '../../components/create_certificate/CreateCertificate'
import { CERTIFICATE_SUBMIT } from '../../constant/ActionTypes'

const columns = [
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
    className: 'table__column'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    className: 'table__column'
  },
  {
    title: 'Certificate Number',
    dataIndex: 'certificate_number',
    key: 'certificate_number',
    className: 'table__column'
  },
  {
    title: 'Effective Date',
    dataIndex: 'effective_date',
    key: 'effective_date',
    className: 'table__column'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">View details</a>
      </span>
    ),
    className: 'table__column'
  }
];

class BrokerIndex extends Component {
  state = {
    loading: false,
    visible: false
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleOk = (certificate) => {
    this.setState({ loading: true });
    this.props.storeCertificate(certificate)
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    setTimeout(() => {
      this.setState({ visible: false });
    }, 10);
  }
  render() {
    return(
      <MainLayout>
        <Row className="table-header">
          <Col span={12}>
            <h2 className="table-header__title">Summary</h2>
          </Col>
          <Col span={12} style={{ textAlign: 'right'}}>
            <Button className="table-header__add-button" type="primary" size="large" onClick={this.showModal}>+ Certificate</Button>
          </Col>
        </Row>
        <div className="table-menu__search-bar">
          <Input placeholder="Search Certificate by email" size="large"/>
        </div>
        <Table
          className="table"
          columns={columns}
          dataSource={this.props.certificates_list}
          pagination={false}
        />
        <CreateCertificate
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          loading={this.state.loading}
        />
      </MainLayout>
    )
  }
}


const mapStateToProps = (state) => ({
  ...state.broker
})

const mapDispatchToProps = (dispatch) => {
  return {
    storeCertificate: (certificate) =>
      dispatch({ type: CERTIFICATE_SUBMIT, payload: certificate })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrokerIndex)
