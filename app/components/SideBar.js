import React from 'react';
import SchoolsNavTree from './NavTree';
import _ from 'lodash';
var classNames = require('classnames');
import $ from 'jquery';


var SideBar = React.createClass({
  getInitialState() {
    return {
      isExpanded: false,
      results: []
    };
  },
  componentDidMount() {
  },
  /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps(nextProps) {
  },

  toggleTree: function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  },

  render: function() {
    let {onBoundaryClick, boundariesByParentId, boundaryDetails, primarySelected} = this.props;
    const schoolType = primarySelected ? 1 : 2
    boundariesByParentId[1] = _.filter(boundariesByParentId[1], (key) =>  {
      const boundaryType = boundaryDetails[key].boundary_type
      return boundaryType ? boundaryType == schoolType : true
    })
    var sidebarClass = classNames({
      'toggled': this.state.isExpanded
    })
    return (
      <div id="sidebar-wrapper">
        <div id="treetoggler">
          <a href="#menu-toggle" className="btn btn-primary btn-xs" id="menu-toggle" onClick={ this.toggleTree }>
            <span id="toggler-icon" className="glyphicon glyphicon-resize-horizontal"></span>
          </a>
        </div>
        <div id="treeview_side" className="treeview">
          <SchoolsNavTree onBoundaryClick={ onBoundaryClick } boundaryDetails={ boundaryDetails } boundariesByParentId={ boundariesByParentId } />
        </div>
      </div>
      );
  }
});

module.exports = SideBar;
