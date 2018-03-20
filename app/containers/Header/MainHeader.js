import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderBar } from '../../components/Header';
import { logoutUser, openChangeUserInfoModal, openChangePasswordModal } from '../../actions';

class Header extends Component {
  componentDidMount() {
    $('.dropdown-toggle').dropdown();
  }

  render() {
    return <HeaderBar {...this.props} />;
  }
}

const mapStateToProps = () => {
  const user = { firstName: 'Pankaj', lastName: 'Thakur' }; // JSON.parse(sessionStorage.getItem('user')); ||

  return {
    username: `${user.firstName} ${user.lastName}`,
  };
};

const MainHeader = connect(mapStateToProps, {
  logoutUser,
  openChangeUserInfoModal,
  openChangePasswordModal,
})(Header);

export { MainHeader };
