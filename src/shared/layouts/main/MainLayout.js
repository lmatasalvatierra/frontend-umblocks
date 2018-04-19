import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col } from 'antd';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import { Link } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

class MainLayout extends Component {
  render() {
    return (
      <div className="container">
        <Layout style={{ background: 'unset' }}>
          <Header
            className="header"
            style={{ background: 'unset', padding: 'unset' }}
          >
            <Row>
              <Col className="header__title" span={8}>
                Umblocks
              </Col>
              <Col className="header__user-profile" span={3} offset={10}>
                <MdAccountCircle /> Peter
              </Col>
              <Col className="header__logout" span={3}>
                <Link to={'/'} style={{ color: 'white' }}>
                  Log out <FaSignOut />
                </Link>
              </Col>
            </Row>
          </Header>
          <Content
            className="main-container"
            style={{ backgroundColor: '#ffffff' }}
          >
            {this.props.children}
          </Content>
          <Footer
            className="footer"
            style={{ background: 'unset', padding: 'unset', paddingTop: 12 }}
          >
            <div>
              <Row>
                <Col className="footer__links" span={6} push={18}>
                  About the project - Contact
                </Col>
                <Col className="footer__description" span={18} pull={6}>
                  Umblocks. Manage your Certificates of Insurance with
                  Blockchain. 2018
                </Col>
              </Row>
            </div>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
