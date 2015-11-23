import React from 'react';
import TreeView from './treeView';
var classNames = require('classnames');
import $ from 'jquery';


var SideBar = React.createClass ({
	getInitialState() {
    	return {isExpanded: false, results: []};
  	},
  toggleTree() {
    this.setState({isExpanded: !this.state.isExpanded})
  },
	componentDidMount() {

  },

	render: function() {
  var sidebarClass = classNames({
  'toggled': this.state.isExpanded})
		return (
         <div id="sidebar-wrapper">
            <div id="treetoggler">
              <a href="#menu-toggle" className="btn btn-primary btn-xs" id="menu-toggle">
                <span id="toggler-icon" onClick={this.toggleTree} className="glyphicon glyphicon-resize-horizontal"></span>
              </a>
            </div>
          <div id="treeview_side" className="treeview"><TreeView/></div>
        </div>
		);
	}
});

module.exports=SideBar;
