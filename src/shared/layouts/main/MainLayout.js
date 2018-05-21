import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import FaBuildingO from 'react-icons/lib/fa/building-o';
import FaSuitcase from 'react-icons/lib/fa/suitcase';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import { Link } from 'react-router-dom';
import { userLoggedOut } from '../../actions/auth';

const { Header, Footer, Content } = Layout;

const userIcon = userType => {
  switch (userType) {
    case 'owner':
      return <MdAccountCircle size={30} style={{ paddingRight: '8px' }} />;
    case 'broker':
      return <FaSuitcase size={30} style={{ paddingRight: '8px' }} />;
    case 'carrier':
      return <FaBuildingO size={30} style={{ paddingRight: '8px' }} />;
    default:
      break;
  }
};

class MainLayout extends Component {
  handleLogout = () => {
    document.cookie = 'user= ; path=/';
    this.props.onLogout();
  };

  render() {
    const { name, user_type } = this.props.data;
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
              <Col className="header__user-profile" span={4} offset={8}>
                {userIcon(user_type)}
                {name}
              </Col>
              <Col className="header__logout" span={4}>
                <Link
                  to="/login"
                  onClick={this.handleLogout}
                  style={{ color: 'white' }}
                >
                  Log out <FaSignOut />
                </Link>
              </Col>
            </Row>
          </Header>
          <Content
            className="main-container"
            style={{ backgroundColor: 'unset' }}
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

MainLayout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  data: PropTypes.object,
  user_type: PropTypes.string,
  name: PropTypes.string,
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(userLoggedOut()),
  };
};

const mapStateToProps = state => ({
  ...state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
