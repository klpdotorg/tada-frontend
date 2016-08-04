/*
* Main header at the top of the page
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import klplogo from '../../assets/images/KLP_logo.png';

class HeaderBar extends React.Component {

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
            <p className="navbar-text pull-right">
              <button type="button" className="btn btn-primary padded-btn"><span className="glyphicon glyphicon-user"></span></button>
              <Link to="/logout" onClick={ this.props.handleLogout } className="btn btn-primary padded-btn"><span className="glyphicon glyphicon-off"></span></Link>
            </p>
            <p className="login-msg navbar-text pull-right">Hello there <span className="fa fa-smile-o"></span>
              { this.props.username }!
            </p>
          </div>
        </div>
      </nav>
      );
  }
}

module.exports = HeaderBar;
