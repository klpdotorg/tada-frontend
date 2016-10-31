/*
* Main header at the top of the page
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import klplogo from '../../assets/images/KLP_logo.png';

class HeaderBar extends Component {
  
  constructor(props) {
    super(props);
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
                <li><button className="btn btn-default dropdown-item" data-toggle="modal">Update Profile</button></li>

              </ul>

              <Link to="/logout" onClick={ this.props.handleLogout } className="btn btn-primary padded-btn"><span className="glyphicon glyphicon-off"></span></Link>

            </div>
            
            <p className="login-msg navbar-text pull-right">Hello there <span className="fa fa-smile-o"></span>
              { this.props.username }!
            </p>
          </div>
        </div>
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
                                    <label for="newPassword" className="control-label">New password:</label>
                                    <input type="text" className="form-control" id="newPassword"/>
                                </div>
                                <div className="form-group">
                                    <label for="reenterPassword" className="control-label">Re-enter password:</label>
                                    <input type="text" className="form-control" id="reenterPassword"/>
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
