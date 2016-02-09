/*
* Main header at the top of the page 
*/

import React, { Component } from 'react';
import auth from './Auth';
import {Link} from 'react-router';

class HeaderBar extends React.Component {
	contextTypes: {
    	router: React.PropTypes.object.isRequired,
  	}

	handleLogout()
	{
		auth.logout();
	}

	render() {
		return (			
		<nav className="main__header navbar navbar-white navbar-fixed-top">
			<div id="header" className="container-fluid">
			<div className="navbar-header">
			<a className="navbar-brand" href="#">
				<img src="assets/images/KLP_logo.png"/>
			</a>
			</div>

		 	<div id="navbar" className="navbar-collapse collapse">
     		<p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
     		<p className="navbar-text pull-right">
     		<button type="button" className="btn btn-primary"><span className="glyphicon glyphicon-user"></span></button>
     		<Link to="/logout" onClick={this.handleLogout}><span className="btn btn-primary glyphicon glyphicon-off"></span></Link>

    </p>

    <p className="login-msg navbar-text pull-right">Hello there <span className="fa fa-smile-o"></span> ! Mohsina Taj
  	</p></div>
			</div>
		</nav>
		);
	}
}

module.exports = HeaderBar;
