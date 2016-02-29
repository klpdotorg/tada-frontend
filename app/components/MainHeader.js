/*
* Main header at the top of the page 
*/

import React, { Component } from 'react';
import auth from './Auth';
import {Link} from 'react-router';
import klplogo from '../../assets/images/KLP_logo.png';
import TadaStore from '../stores/TadaStore';

class HeaderBar extends React.Component {
	contextTypes: {
    	router: React.PropTypes.object.isRequired,
  	}

  	constructor(props, context)
  	{
  		super(props,context);
  		this.state = {
  			userName: 'user',
  		};
  		this._onChange = this._onChange.bind(this);
  	}

	handleLogout()
	{
		auth.logout();
	}

	componentDidMount()
  	{
    	TadaStore.addChangeListener(this._onChange);
  	}

  	 _onChange()
  	 {
  	 	console.log("RECEIVED USERNAME CHANGE EVENT", TadaStore.getUserData().username);
  	 	this.state.userName = TadaStore.getUserData().username;
  	 }

	render() {
		
		console.log("sessionStorage username is ", sessionStorage.username);
		return (			
		<nav className="main__header navbar navbar-white navbar-fixed-top">
			<div id="header" className="container-fluid">
			<div className="navbar-header">
			<a className="navbar-brand" href="#">
				<img src={klplogo}/>
			</a>
			</div>

		 	<div id="navbar" className="navbar-collapse collapse">
     		<p className="app-name navbar-text pull-left">Data Entry Operations 2015-2016</p>
     		<p className="navbar-text pull-right">
     		<button type="button" className="btn btn-primary padded-btn"><span className="glyphicon glyphicon-user"></span></button>
     		<Link to="/logout" onClick={this.handleLogout} className="btn btn-primary padded-btn"><span className="glyphicon glyphicon-off"></span></Link>

    </p>

    <p className="login-msg navbar-text pull-right">Hello there <span className="fa fa-smile-o"></span> {sessionStorage.username}! 
  	</p></div>
			</div>
		</nav>
		);
	}
}

module.exports = HeaderBar;
