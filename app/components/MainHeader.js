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
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
  }

//Add validity checking here
  handleChangePassword()
  {
      var currentPwd = this.currentPassword.value;
      var newPwd = this.newPassword.value;
      var verifyPwd = this.reenterNewPassword.value;
      this.props.handleChangePassword(currentPwd, newPwd);
      $('#changePasswordModal').modal('hide');
  }

//Add validity checking here
  handleChangeUserName()
  {
    var pwd = this.usernamePassword.value;
    var newUserName = this.username.value;
    this.props.handleChangeUserName(newUserName, pwd);
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
                                    <input type="password" className="form-control" id="currentPassword" ref={(ref) => this.currentPassword = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword" className="control-label">New password:</label>
                                    <input type="password" className="form-control" id="newPassword" ref={(ref) => this.newPassword = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reenterPassword" className="control-label">Re-enter password:</label>
                                    <input type="password" className="form-control" id="reenterPassword" ref={(ref) => this.reenterNewPassword = ref}/>
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
                              <h4 className="modal-title" id="changeUserNameTitle"> Change User Information</h4>
                          </div>
                          <div className="modal-body">
                              <form>
                                <div className="form-group">
                                  <label>Your user ID is: {this.props.username}. This cannot be changed.</label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userfirstname" className="control-label">First Name:</label>
                                    <input type="text" className="form-control" id="userfirstname" ref={(ref) => this.newUserName = ref}/>
                                    <label htmlFor="userlastname" className="control-label">Last Name:</label>
                                    <input type="text" className="form-control" id="userlastname" ref={(ref) => this.newUserLastName = ref}/>
                                    <label htmlFor="userEmail" className="control-label">E-mail: </label>
                                    <input type="text" className="form-control" id="email" ref={(ref) => this.email = ref}/>

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
