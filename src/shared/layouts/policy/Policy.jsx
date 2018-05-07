import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { history } from 'client/store';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import MainLayout from '../main/MainLayout';
import ListPolicy from '../../components/list_policy/ListPolicy';

class PolicyView extends Component {
  render() {
    const { view_policy } = this.props;
    return (
      <MainLayout>
        <Row className="table-header">
          <Col span={12}>
            <h2 className="table-header__title">
              <a
                style={{ color: 'white', paddingRight: '10px' }}
                onClick={() => history.goBack()}
              >
                <MdArrowBack />
              </a>
              Policy
            </h2>
          </Col>
        </Row>
        <div className="table">
          <div className="table__background">
            <ListPolicy policy={view_policy} />
          </div>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  ...state.policies,
});

export default connect(mapStateToProps, null)(PolicyView);
