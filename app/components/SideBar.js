import React, { Component } from 'react';
import SchoolsNavTree from './NavTree';
import _ from 'lodash';
var classNames = require('classnames');
import $ from 'jquery';
import { connect } from 'react-redux';
import { fetchEntitiesFromServer, toggleNode} from '../actions/';
import PermissionsNavTree from './PermissionsNavTree';
import * as Selectors from '../selectors/';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      results: []
    };
  }

  componentDidMount() {
  }

  /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps(nextProps) {
    console.log("In sidebar", nextProps.location);
  }

  onBoundaryClick(boundary) {
    this.props.dispatch(toggleNode(boundary.id))
    this.props.dispatch(fetchEntitiesFromServer(boundary.id));
  }

  toggleTree() {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  }

  render() {
    let { boundariesByParentId, boundaryDetails, primarySelected, location } = this.props;
    var DisplayElement;
    const schoolType = primarySelected ? 1 : 2
    boundariesByParentId[1] = _.filter(boundariesByParentId[1], (key) => {
      const boundaryType = boundaryDetails[key].boundary_type
      return boundaryType ? boundaryType == schoolType : true
    })
    var sidebarClass = classNames({
      'toggled': this.state.isExpanded
    })
    if(location.pathname.includes("permissions"))
    {
      let {filteredBoundaryDetails, filteredBoundaryHierarchy } = this.props;
      DisplayElement = <PermissionsNavTree onBoundaryClick={this.onBoundaryClick.bind(this)} boundaryDetails={filteredBoundaryDetails} boundariesByParentId={filteredBoundaryHierarchy}/>
    }
    else {
      DisplayElement =  <SchoolsNavTree onBoundaryClick={this.onBoundaryClick.bind(this)} boundaryDetails={boundaryDetails} boundariesByParentId={boundariesByParentId} />

    }
    
    return (
      <div id="sidebar-wrapper">
        <div id="treetoggler">
          <a href="#menu-toggle" className="btn btn-primary btn-xs" id="menu-toggle" onClick={this.toggleTree}>
            <span id="toggler-icon" className="glyphicon glyphicon-resize-horizontal"></span>
          </a>
        </div>
        <div id="treeview_side" className="treeview">
          {DisplayElement}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return ({
  boundaryDetails: state.boundaries.boundaryDetails,
  boundariesByParentId: state.boundaries.boundariesByParentId,
  routerState: state.routing,
  location: ownProps.location,
  primarySelected: state.schoolSelection.primarySchool,
  filteredBoundaryDetails: Selectors.getVisibleEntities(state),
  filteredBoundaryHierarchy: Selectors.getFilteredBoundaryHierarchy(state)
  }
)};

const SideBarContainer = connect(mapStateToProps)(SideBar);
export default SideBarContainer;
