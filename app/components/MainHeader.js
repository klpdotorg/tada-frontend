/*
* Main header at the top of the page
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import klplogo from '../../assets/images/KLP_logo.png';

class HeaderBar extends Component {
  
  constructor(props) {
    super(props);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangePassword()
  {
      var currentPwd = this.currentPassword.value;
      var newPwd = this.newPassword.value;
      var verifyPwd = this.reenterNewPassword.value;
      this.props.handleChangePassword(currentPwd, newPwd);
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
              <button type="button" className="btn btn-primary padded-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user"></span></button>
              <ul className="dropdown-menu">
                <li><button className="btn btn-default dropdown-item" data-toggle="modal" data-target="#changePasswordModal" >Change Password</button></li>
                <li><button className="btn btn-default dropdown-item" data-toggle="modal" data-target="#changeUserNameModal">Update Profile</button></li>

              </ul>

              <Link to="/logout" onClick={ this.props.handleLogout } className="btn btn-primary padded-btn"><span className="glyphicon glyphicon-off"></span></Link>

            </div>
            
            <p className="login-msg navbar-text pull-right">Hello there <span className="fa fa-smile-o"></span>
              { this.props.username }!
            </p>
          </div>
        </div>
        {/*Change password modal. Consider refactoring to a separate class later if needed */}
        <div className="modal fade" data-backdrop="false" id="changePasswordModal" tabIndex="-1" role="dialog" aria-labelledby="changePasswordModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="changePasswordTitle"> Change password</h4>
                          </div>
                          <div className="modal-body">
                              <form>
                              <div className="form-group">
                                    <label htmlFor="currentPassword" className="control-label">Current password:</label>
                                    <input type="text" className="form-control" id="currentPassword" ref={(ref) => this.currentPassword = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword" className="control-label">New password:</label>
                                    <input type="text" className="form-control" id="newPassword" ref={(ref) => this.newPassword = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reenterPassword" className="control-label">Re-enter password:</label>
                                    <input type="text" className="form-control" id="reenterPassword" ref={(ref) => this.reenterNewPassword = ref}/>
                                </div>
                              </form>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                              <button type="button" className="btn btn-primary" onClick={this.handleChangePassword}>Save changes</button>
                          </div>
                      </div>
                  </div>
        </div>

        {/*Change username modal. Consider refactoring to a separate class later if needed */}
        <div className="modal fade" data-backdrop="false" id="changeUserNameModal" tabIndex="-1" role="dialog" aria-labelledby="changeUserNameModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="changeUserNameTitle"> Change Username</h4>
                          </div>
                          <div className="modal-body">
                              <form>
                                <div className="form-group">
                                  <label>Your username is: {this.props.username}</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username" className="control-label">New Username:</label>
                                    <input type="text" className="form-control" id="username"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="control-label">Password:</label>
                                    <input type="text" className="form-control" id="password"/>
                                </div>
                                
                              </form>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                          </div>
                      </div>
                  </div>
        </div>
      </nav>
      );
  }
}

module.exports = HeaderBar;
