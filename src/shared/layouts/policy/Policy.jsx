import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import MainLayout from '../main/MainLayout'
import ListPolicy from '../../components/list_policy/ListPolicy'


class PolicyView extends Component {
  render() {
    return(
      <MainLayout>
        <Row className="table-header">
          <Col span={12}>
            <h2 className="table-header__title">Policy</h2>
          </Col>
        </Row>
        <div className="table">
          <div className="table__background">
            <ListPolicy/>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default PolicyView;
