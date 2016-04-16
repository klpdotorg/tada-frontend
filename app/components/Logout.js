import React, {Component} from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
var klplogo = require('../../assets/images/KLP_logo.png');

class Logout extends React.Component {

	render()
	{
		return (
		<div id="logout_page">
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
		     		<Link to="/login" className="btn btn-primary padded-btn">LOGIN</Link>
	    			</p>
    			</div>
				</div>
			</nav>
			<div className="container-fluid absolute-center is-responsive">
        <div className="row">
        	<div className="col-lg-12">
        		You have successfully logged out. Come back soon!
        	</div>
        </div>
      </div>
     </div>
		);
	}
};

module.exports=Logout;