import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderBar } from '../../components/Header';
import { logoutUser, openChangeUserInfoModal, openChangePasswordModal } from '../../actions';

class Header extends Component {
  componentDidMount() {
    // $('.dropdown-toggle').dropdown();
    // window.onclick = function(event) {
    //   if (!event.target.matches('.dropbtn')) {
    //     var dropdowns = document.getElementsByClassName("profile-");
    //     var i;
    //     for (i = 0; i < dropdowns.length; i++) {
    //       var openDropdown = dropdowns[i];
    //       if (openDropdown.classList.contains('show')) {
    //         openDropdown.classList.remove('show');
    //       }
    //     }
    //   }
    // }
  }

  render() {
    return <HeaderBar {...this.props} />;
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
