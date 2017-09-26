import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SchoolsNavTree from './NavTree';
import _ from 'lodash';
import $ from 'jquery';
import { connect } from 'react-redux';
import { DEFAULT_PARENT_ID } from 'config';

import { fetchEntitiesFromServer, toggleNode, closePeerNodes } from '../actions/';

import PermissionsNavTree from './PermissionsNavTree';
import ProgramNavTree from './ProgramNavTree';
import * as Selectors from '../selectors/';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.onBoundaryClick = this.onBoundaryClick.bind(this);

    this.state = {
      isExpanded: false,
      results: [],
    };
  }

  componentDidMount() {}

  onBoundaryClick(boundary, depth) {
    console.log(boundary);
    this.props.dispatch(toggleNode(boundary.id));
    this.props.dispatch(fetchEntitiesFromServer(boundary.id));
    this.props.dispatch(closePeerNodes(boundary.id, depth));
  }

  toggleTree(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
  }

  filterBoundaries(type) {
    const { boundariesByParentId, boundaryDetails } = this.props;
    const boundaryIds = _.clone(boundariesByParentId);

    boundaryIds[DEFAULT_PARENT_ID] = _.filter(boundariesByParentId[DEFAULT_PARENT_ID], key => {
      const boundaryType = boundaryDetails[key].type;
      return boundaryType === type;
    });

    return boundaryIds;
  }

  renderNavTree() {
    const {
      boundariesByParentId,
      boundaryDetails,
      primarySelected,
      location,
      programsById,
      dispatch,
      programBoundaries,
      assessmentsById,
    } = this.props;
    const selectedSchoolType = primarySelected ? 'primary' : 'pre';
    const boundaryIds = this.filterBoundaries(selectedSchoolType);

    if (location.pathname.includes('permissions')) {
      let { filteredBoundaryDetails, filteredBoundaryHierarchy } = this.props;
      return (
        <PermissionsNavTree
          dispatch={this.props.dispatch}
          onBoundaryClick={this.onBoundaryClick}
          boundaryDetails={filteredBoundaryDetails}
          boundariesByParentId={filteredBoundaryHierarchy}
        />
      );
    }

    if (location.pathname.includes('filterprograms')) {
      return (
        <ProgramNavTree
          dispatch={dispatch}
          programsById={programsById}
          boundaries={programBoundaries}
          boundaryDetails={boundaryDetails}
          boundariesByParentId={boundariesByParentId}
          assessmentsById={assessmentsById}
        />
      );
    }

    return (
      <SchoolsNavTree
        onBoundaryClick={this.onBoundaryClick}
        boundaryDetails={boundaryDetails}
        boundaryIds={boundaryIds}
      />
    );
  }

  render() {
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
          {this.renderNavTree()}
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  dispatch: PropTypes.func,
  boundariesByParentId: PropTypes.object,
  boundaryDetails: PropTypes.object,
  primarySelected: PropTypes.bool,
  location: PropTypes.object,
  filteredBoundaryDetails: PropTypes.object,
  filteredBoundaryHierarchy: PropTypes.object,
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
});

const SideBarContainer = connect(mapStateToProps)(SideBar);
export default SideBarContainer;
