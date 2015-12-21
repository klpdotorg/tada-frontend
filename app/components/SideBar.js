import React from 'react';
import SchoolsNavTree from './NavTree';
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
    console.log("In Sidebar:", this.props.boundaries);
  },
   /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps(nextProps){
    console.log('Sidebar componentWillReceiveProps', nextProps.boundaries);
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
          <div id="treeview_side" className="treeview"><SchoolsNavTree boundaries={this.props.boundaries}/></div>
        </div>
		);
	}
});

module.exports=SideBar;
