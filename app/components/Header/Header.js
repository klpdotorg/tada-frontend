/*
* Main header at the top of the page
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { ConfirmPassword, ChangePassword, ChangeUserInfo } from '../../containers/Header';

import klplogo from '../../../assets/images/KLP_logo.png';

const HeaderBar = ({ username, openChangePasswordModal, openChangeUserInfoModal, logoutUser }) => {
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
              className="btn btn-primary padded-btn dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="glyphicon glyphicon-user" />
              <span className="caret" />
            </button>
            <ul className="dropdown-menu">
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
    </nav>
  );
};

HeaderBar.propTypes = {
  username: PropTypes.string,
  openChangePasswordModal: PropTypes.func,
  openChangeUserInfoModal: PropTypes.func,
  logoutUser: PropTypes.func,
};

export { HeaderBar };
