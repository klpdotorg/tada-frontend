/*
* Secondary navigation bar for filtering/search etc..
*/
import React, {Component} from 'react';

export default class SecondaryNavBar extends React.Component{
	render() {
		return(
			<div className="container-fluid">
			<button type="button" className="btn btn-primary navbar-btn all-padded-btn pull-left"><span className="glyphicon glyphicon-home"></span></button>
			<form className="navbar-form navbar-left" role="search">
    	<div className="form-group">
      	<input type="text" className="form-control" placeholder="Enter KLP ID"/>
    	</div>
    	<button type="submit" className="btn btn-default">Search</button>
  		</form>

  		<p className="pull-right">
			<button type="button" className="btn btn-info navbar-btn all-padded-btn"><span className="fa fa-pencil-square-o"></span> Manage Programs</button>
			<button type="button" className="btn btn-info navbar-btn all-padded-btn"><span className="fa fa-undo"></span></button>
			<button type="button" className="btn btn-info navbar-btn all-padded-btn"><span className="fa fa-bar-chart"></span></button>
			<button type="button" className="btn btn-info navbar-btn all-padded-btn"><span className="fa fa-database"></span></button>
			<button type="button" className="btn btn-info navbar-btn all-padded-btn"><span className="fa fa-user-plus"></span></button>
			<button type="button" className="btn btn-info navbar-btn all-padded-btn"><span className="fa fa-key"></span></button>
			<button type="button" className="btn btn-info navbar-btn all-padded-btn"><span className="fa fa-globe"></span></button>
			<button type="button" className="btn btn-primary navbar-btn all-padded-btn"><span className="glyphicon glyphicon-filter"></span> Filter by Programs</button>
  </p>
  		</div>
	);
	}
}