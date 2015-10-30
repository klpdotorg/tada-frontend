import React, { Component } from 'react';

class HeaderBar extends React.Component {
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
     <button type="button" className="btn btn-primary"><span className="glyphicon glyphicon-off"></span></button>
    </p>
    <p className="login-msg navbar-text pull-right">Hello there <span className="fa fa-smile-o"></span> ! Mohsina Taj
  </p></div>
			</div>
		</nav>
		);
	}
}

module.exports = HeaderBar;
