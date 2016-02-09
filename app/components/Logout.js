import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import auth from './Auth';

var Logout = React.createClass({

	render: function()
	{
		return (
			<div>
				Logged out of Akshara's data entry system.				
			</div>
		);
	}
});

module.exports=Logout;