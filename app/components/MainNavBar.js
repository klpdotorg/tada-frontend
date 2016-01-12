/*
* Main navigation bar - PrimarySchool/PreSchool selector
*/

import React, {Component} from 'react';
import TadaActionCreators from '../actions/TadaActionCreators';


var unselectedTabColor = {
	backgroundColor: '#26b262'
}

var selectedTabColor = {
				backgroundColor: '#ec6608'
			}
var bottomMargin = {
				marginBottom: '0px'
			}



//Main Navbar with the PrimarySchool/PreSchool navigation tabs
export default class NavBar extends React.Component {


	handleClickPrimarySchool()
	{
		console.log('Primary school clicked');
		TadaActionCreators.showPrimarySchoolHierarchy();

	}
	handleClickPreSchool()
	{
		console.log('Preschool clicked');
		TadaActionCreators.showPreSchoolHierarchy();
	}
	render() {
		return(
			<div id="navbar" className="main__navbar">
				<div className="nav nav-pills">
				<div className="col-lg-12 inst-tabs">
				<ul className="nav nav-tabs" id="myTab" style={bottomMargin}>
      				<li className="active"><a data-toggle="tab" style={selectedTabColor} onClick={this.handleClickPrimarySchool}>Primary School</a></li>
      				<li><a data-toggle="tab" style={unselectedTabColor} onClick={this.handleClickPreSchool}> Preschool</a></li>
    			</ul>
				</div>
				</div>
			</div>
		);
	}
}

