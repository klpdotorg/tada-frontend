/*
* Main header at the top of the page
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import klplogo from '../../assets/images/KLP_logo.png';
import jqueryValidation from 'jquery-validation';
import ConfirmPassword from './Modals/ConfirmPassword';
import ChangePassword from './Modals/ChangePassword';
import ChangeUserInfo from './Modals/ChangeUserInfo';
import { checkUserPassword, changePassword } from '../actions/';
import Notifications from 'react-notification-system-redux';
import { baseNotification } from '../actions/';
class HeaderBar extends Component {
  
  constructor(props) {
    super(props);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.state= {
      enterCurrentPassword: false,
      changePasswordOpen: false,
      changeUserOpen: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    
  }

  openChangeUser() {
    this.setState({
      changeUserOpen: true,
    })
  }

  closeChangeUser() {
    this.setState({
      changeUserOpen:false,
    })
  }
  changeUserInfo(email, firstname, lastname, mobile) {

  }
  openChangePasswordModal() {
    this.setState({
      changePasswordOpen: true,
    })
  }

  closeChangePwd() {
    this.setState({
      changePasswordOpen: false,
    })
  }

  closePasswordModal() {
    this.setState({
      enterCurrentPassword: false,
    });
  }

  openPasswordModal() {
    this.setState({
      enterCurrentPassword: true,
    });
  }

  changePwd(newPass) {
    this.props.dispatch(changePassword(this._currentPwd, newPass)).then(() => {
      this.props.dispatch(Notifications.success({
        ...baseNotification,
        title: "Password changed",
        message: "Password changed successfully!"
      }));
      this._currentPwd="";
      this.closeChangePwd();
    }).catch(error => {
        this.props.dispatch(Notifications.error({
        ...baseNotification,
        title: "Password change failed",
        message: "Password could not be changed!"
      }));
      this._currentPwd="";
      this.closeChangePwd();
    })
  }

//Add validity checking here
  handleChangeUserName()
  {
    var pwd = this.usernamePassword.value;
    var newUserName = this.username.value;
    this.props.handleChangeUserName(newUserName, pwd);
  }

  confirmCurrentPwd(pwd) {
    this.props.dispatch(checkUserPassword(pwd)).then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.closePasswordModal();
          this._currentPwd = pwd;
          this.openChangePasswordModal();
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).catch(error => {
        this.props.dispatch(Notifications.error({
        ...baseNotification,
        title: "Password Invalid",
        message: "Current password not valid! Please try again!"
      }));
    });
  }

  render() {
    return (
      <nav className="main__header navbar navbar-white navbar-fixed-top">
        <div id="header" className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img src={ klplogo } />
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
            
            <div className="btn-group navbar-text pull-right">
              <button type="button" className="btn btn-primary padded-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user"></span><span className="caret"></span></button>
              <ul className="dropdown-menu">
                <li onClick={this.openPasswordModal.bind(this)}><a href="#">Change Password</a></li>
                <li className="divider"></li>
                <li onClick={this.openChangeUser.bind(this)}><a href="#">Update Profile</a></li>

              </ul>

              <Link to="/logout" onClick={ this.props.handleLogout } className="btn btn-primary padded-btn"><span className="glyphicon glyphicon-off"></span></Link>

            </div>
            
            <p className="login-msg navbar-text pull-right">Hello there <span className="fa fa-smile-o"></span>
              { this.props.username }!
            </p>
          </div>
        </div>
        <ConfirmPassword isOpen={ this.state.enterCurrentPassword } onCloseModal={ this.closePasswordModal.bind(this)} handleSubmit={this.confirmCurrentPwd.bind(this)}/>
       <ChangePassword isOpen={ this.state.changePasswordOpen } onCloseModal={ this.closeChangePwd.bind(this)} handleSubmit={this.changePwd.bind(this)}/>
       <ChangeUserInfo isOpen = { this.state.changeUserOpen} onCloseModal={this.closeChangeUser.bind(this)} handleSubmit={this.changeUserInfo.bind(this)}/>

      
      </nav>
      );
  }
}

module.exports = HeaderBar;
