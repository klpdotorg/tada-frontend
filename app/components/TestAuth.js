import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import auth from './Auth';
import {Link, Router} from 'react-router';

var TestComp = React.createClass({

	contextTypes: {
      router: React.PropTypes.object,
  	},

	handleClick(e)
	{
		console.log("Someone clicked me!");
		e.preventDefault();
    	this.context.router.transitionTo('/');
	},

	render: function()
	{
		const linklabel=<Link to="/logout" key="unique"><span className="glyphicon glyphicon-off"></span></Link>

		return (
			<div>
				Just saying Hello!	
				<Link to="/logout">Logout</Link>
				{linklabel}
				{/*<button onClick={this.handleClick.bind(this)}>BUTTON</button>*/}

			</div>
		);
	}
});

module.exports=TestComp;