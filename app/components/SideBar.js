import React from 'react';
import SchoolsNavTree from './NavTree';
var classNames = require('classnames');
import $ from 'jquery';


var SideBar = React.createClass ({
	getInitialState() {
    	return {isExpanded: false, results: []};
  	},
	componentDidMount() {
    console.log("In Sidebar:", this.props.boundaries);
  },
   /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps(nextProps){
    console.log('Sidebar componentWillReceiveProps', nextProps.boundaries);
  },

  toggleTree: function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  },

	render: function() {
  var sidebarClass = classNames({
  'toggled': this.state.isExpanded})
		return (
         <div id="sidebar-wrapper">
            <div id="treetoggler">
              <a href="#menu-toggle" className="btn btn-primary btn-xs" id="menu-toggle" onClick={this.toggleTree}>
                <span id="toggler-icon" className="glyphicon glyphicon-resize-horizontal"></span>
              </a>
            </div>
          <div id="treeview_side" className="treeview"><SchoolsNavTree onBoundaryClick={this.props.onBoundaryClick} boundaries={this.props.boundaries} boundaryDetails={this.props.boundaryDetails} boundaryParentChildMap={this.props.boundaryParentChildMap}/></div>
        </div>
		);
	}
});

module.exports=SideBar;
