import React from 'react';
import SchoolsNavTree from './NavTree';
var classNames = require('classnames');
import $ from 'jquery';


var SideBar = React.createClass ({
	getInitialState() {
    	return {isExpanded: false, results: []};
  	},
	componentDidMount() {
    console.log("In Sidebar:", this.props.boundariesByParentId);
  },
   /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps(nextProps){
    console.log('Sidebar componentWillReceiveProps', nextProps.boundariesByParentId);
  },

  toggleTree: function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  },

	render: function() {
    const {onBoundaryClick, boundariesByParentId, boundaryDetails} = this.props;
  var sidebarClass = classNames({
  'toggled': this.state.isExpanded})
		return (
         <div id="sidebar-wrapper">
            <div id="treetoggler">
              <a href="#menu-toggle" className="btn btn-primary btn-xs" id="menu-toggle" onClick={this.toggleTree}>
                <span id="toggler-icon" className="glyphicon glyphicon-resize-horizontal"></span>
              </a>
            </div>
          <div id="treeview_side" className="treeview"><SchoolsNavTree onBoundaryClick={onBoundaryClick} boundaryDetails={boundaryDetails} boundariesByParentId={boundariesByParentId}/></div>
        </div>
		);
	}
});

module.exports=SideBar;
