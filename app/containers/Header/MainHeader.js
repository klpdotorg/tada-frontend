import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderBar } from '../../components/Header';
import { logoutUser, openChangeUserInfoModal, openChangePasswordModal } from '../../actions';

class Header extends Component {
  componentDidMount() {
    window.onclick = (event) => {
      if (!event.target.matches('.show-profile-dropdown')) {
        const el = document.getElementById('profile-dropdown');
        if (el && el.classList.contains('show')) {
          el.classList.remove('show');
        }
      }
    };
  }

  openDropdown() {
    const el = document.getElementById('profile-dropdown');
    if (!el.classList.contains('show')) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  }

  render() {
    return <HeaderBar {...this.props} openDropdown={this.openDropdown} />;
  }
}

const mapStateToProps = (state) => {
  const { firstName, lastName } = state.profile;

  return {
    username: `${firstName} ${lastName}`,
  };
};

const MainHeader = connect(mapStateToProps, {
  logoutUser,
  openChangeUserInfoModal,
  openChangePasswordModal,
})(Header);

export { MainHeader };
