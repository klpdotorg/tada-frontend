import React, { Component } from 'react';
import SchoolsNavTree from './NavTree';
import _ from 'lodash';
import classNames from 'classnames';
import $ from 'jquery';
import { connect } from 'react-redux';

import { fetchEntitiesFromServer, toggleNode, closePeerNodes } from '../actions/';

import PermissionsNavTree from './PermissionsNavTree';
import ProgramNavTree from './ProgramNavTree';
import MapAssessmentNavTree from './map-assessments/NavTree';
import * as Selectors from '../selectors/';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      results: [],
    };
  }

  componentDidMount() {}

  onBoundaryClick(boundary, depth) {
    this.props.dispatch(toggleNode(boundary.id));
    this.props.dispatch(fetchEntitiesFromServer(boundary.id));
    this.props.dispatch(closePeerNodes(boundary.id, depth));
  }

  toggleTree(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
  }

  filterBoundariesByType(boundariesByParentId, boundaryDetails) {
    const schoolType = this.props.primarySelected ? 1 : 2;

    return _.filter(boundariesByParentId[1], key => {
      const boundaryType = boundaryDetails[key].boundary_type;
      return boundaryType ? boundaryType == schoolType : true;
    });
  }

  render() {
    let {
      boundariesByParentId,
      boundaryDetails,
      primarySelected,
      location,
      mapAssessmentBoundaries,
    } = this.props;
    var DisplayElement;
    let mABoundariesByParentId = mapAssessmentBoundaries.boundariesByParentId;

    boundariesByParentId[1] = this.filterBoundariesByType(boundariesByParentId, boundaryDetails);

    mABoundariesByParentId[1] = this.filterBoundariesByType(
      mABoundariesByParentId,
      mapAssessmentBoundaries.boundaryDetails,
    );

    var sidebarClass = classNames({
      toggled: this.state.isExpanded,
    });
    if (location.pathname.includes('permissions')) {
      let { filteredBoundaryDetails, filteredBoundaryHierarchy } = this.props;
      DisplayElement = (
        <PermissionsNavTree
          dispatch={this.props.dispatch}
          onBoundaryClick={this.onBoundaryClick.bind(this)}
          boundaryDetails={filteredBoundaryDetails}
          boundariesByParentId={filteredBoundaryHierarchy}
        />
      );
    } else if (location.pathname.includes('filterprograms')) {
      let { filteredBoundaryDetails, filteredBoundaryHierarchy } = this.props;
      DisplayElement = (
        <ProgramNavTree
          dispatch={this.props.dispatch}
          programsById={this.props.programsById}
          boundaries={this.props.programBoundaries}
          boundaryDetails={this.props.boundaryDetails}
          boundariesByParentId={this.props.boundariesByParentId}
          assessmentsById={this.props.assessmentsById}
        />
      );
    } else if (location.pathname.includes('mapassessment')) {
      DisplayElement = (
        <MapAssessmentNavTree
          dispatch={this.props.dispatch}
          boundaryDetails={mapAssessmentBoundaries.boundaryDetails}
          boundariesByParentId={mABoundariesByParentId}
          primarySelected={primarySelected}
        />
      );
    } else {
      DisplayElement = (
        <SchoolsNavTree
          onBoundaryClick={this.onBoundaryClick.bind(this)}
          boundaryDetails={boundaryDetails}
          boundariesByParentId={boundariesByParentId}
        />
      );
    }

    return (
      <div id="sidebar-wrapper">
        <div id="treetoggler">
          <a
            href="#menu-toggle"
            className="btn btn-primary btn-xs"
            id="menu-toggle"
            onClick={this.toggleTree}
          >
            <span id="toggler-icon" className="glyphicon glyphicon-resize-horizontal" />
          </a>
        </div>
        <div id="treeview_side" className="treeview">
          {DisplayElement}
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  dispatch: React.PropTypes.func,
  boundariesByParentId: React.PropTypes.object,
  boundaryDetails: React.PropTypes.object,
  primarySelected: React.PropTypes.bool,
  location: React.PropTypes.object,
  filteredBoundaryDetails: React.PropTypes.object,
  filteredBoundaryHierarchy: React.PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  boundaryDetails: state.boundaries.boundaryDetails,
  boundariesByParentId: state.boundaries.boundariesByParentId,
  programsById: Selectors.getProgramsBySchoolType(state),
  programBoundaries: state.programs.boundaries,
  routerState: state.routing,
  location: ownProps.location,
  primarySelected: state.schoolSelection.primarySchool,
  filteredBoundaryDetails: Selectors.getBoundaryDetailsOnly(state),
  filteredBoundaryHierarchy: Selectors.getBoundariesOnly(state),
  assessmentsById: state.assessments.assessmentsById,
  mapAssessmentBoundaries: state.mapAssessments.boundaries,
});

const SideBarContainer = connect(mapStateToProps)(SideBar);
export default SideBarContainer;
