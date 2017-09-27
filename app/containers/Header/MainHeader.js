import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderBar } from '../../components/Header';
import { logoutUser, openChangeUserInforModal, openChangePasswordModal } from '../../actions';

class Header extends Component {
  componentDidMount() {
    $('.dropdown-toggle').dropdown();
  }

  render() {
    return <HeaderBar {...this.props} />;
  }
}

const mapStateToProps = state => ({
  username: state.login.username,
});

const MainHeader = connect(mapStateToProps, {
  logoutUser,
  openChangeUserInforModal,
  openChangePasswordModal,
})(Header);

export { MainHeader };
