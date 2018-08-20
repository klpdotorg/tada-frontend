import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import { SideBarWrapper } from '../../components/SideBar';
import { getEntity, setParentNode } from '../../actions';
import { Loading } from '../../components/common';

const SchoolsNavTree = Loadable({
  loader: () => {
    return import('./NavTree');
  },
  loading: Loading,
});

const PermissionsNavTree = Loadable({
  loader: () => {
    return import('./PermissionsNavTree');
  },
  loading: Loading,
});

const ProgramNavTree = Loadable({
  loader: () => {
    return import('./ProgramNavTree');
  },
  loading: Loading,
});

const MapAssessmentTree = Loadable({
  loader: () => {
    return import('./MapAssessmentTree');
  },
  loading: Loading,
});

/*
  This function used to check which assessment entry form user is see
  (student, studentGroup or institution assessment entry form)
*/

const urlAssociatedWith = (path) => {
  if (path.includes('students')) {
    return 'studentGroupId';
  }

  if (path.includes('studentgroup')) {
    return 'studentGroupId';
  }

  return 'institutionId';
};

// This display the sidebar in the filterByProgram page
class SideBar extends Component {
  constructor() {
    super();

    this.renderNavTree = this.renderNavTree.bind(this);
  }

  renderNavTree() {
    const { location, params } = this.props;
    const entityIdentity = urlAssociatedWith(location.pathname);
    const props = {
      params,
      entityIdentity,
    };

    if (location.pathname.includes('permissions')) {
      return <PermissionsNavTree {...props} />;
    }

    if (location.pathname.includes('filterprograms')) {
      return <ProgramNavTree {...props} />;
    }

    if (location.pathname.includes('mapassessments')) {
      return <MapAssessmentTree {...props} />;
    }

    return <SchoolsNavTree {...props} />;
  }

  render() {
    const { showSideBar } = this.props;

    return <SideBarWrapper showSideBar={showSideBar} renderNavTree={this.renderNavTree} />;
  }
}

SideBar.propTypes = {
  location: PropTypes.object,
  showSideBar: PropTypes.bool,
  params: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    selectedPrimarySchool: state.schoolSelection.primarySchool,
  };
};

const SideBarContainer = connect(mapStateToProps, { getEntity, setParentNode })(SideBar);

export { SideBarContainer };
