/*
* Main header at the top of the page
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { ChangePassword, ChangeUserInfo, ConfirmPassword, GetOTP } from '../../containers/Profile';

import klplogo from '../../css/images/KLP_logo.png';

const HeaderBar = (props) => {
  const { username, openChangePasswordModal, openChangeUserInfoModal, logoutUser } = props;
  return (
    <nav className="main__header navbar navbar-white navbar-fixed-top">
      <div id="header" className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            <img role="presentation" src={klplogo} />
          </a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>

          <div className="btn-group navbar-text pull-right dropdown">
            <button
              type="button"
              id="show-profile-dropdown"
              className="btn btn-primary padded-btn dropdown-toggle show-profile-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={props.openDropdown}
            >
              <span
                className="glyphicon glyphicon-user show-profile-dropdown"
                id="profile-user-icon"
              />
              <span className="caret show-profile-dropdown" />
            </button>
            <ul className="dropdown-menu" id="profile-dropdown">
              <li onClick={openChangePasswordModal}>
                <a href="#">Change Password</a>
              </li>
              <li className="divider" />
              <li onClick={openChangeUserInfoModal}>
                <a href="#">Update Profile</a>
              </li>
            </ul>
            <Link to="/logout" onClick={logoutUser} className="btn btn-primary padded-btn">
              <span className="glyphicon glyphicon-off" />
            </Link>
          </div>
          <p className="login-msg navbar-text pull-right">
            Hello there <span className="fa fa-smile-o" />
            {username}!
          </p>
        </div>
      </div>
      <ConfirmPassword />
      <ChangePassword />
      <ChangeUserInfo />
      <GetOTP />
    </nav>
  );
};

HeaderBar.propTypes = {
  username: PropTypes.string,
  openChangePasswordModal: PropTypes.func,
  openChangeUserInfoModal: PropTypes.func,
  logoutUser: PropTypes.func,
  openDropdown: PropTypes.func,
};

export { HeaderBar };
