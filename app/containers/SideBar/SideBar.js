import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SideBarWrapper } from '../../components/SideBar';
import { SchoolsNavTree, PermissionsNavTree, ProgramNavTree, MapAssessmentTree } from './index';
import { getEntity, setParentNode } from '../../actions';

const urlAssociatedWith = (path) => {
  if (path.includes('students')) {
    return 'studentGroupId';
  }

  if (path.includes('studentgroup')) {
    return 'studentGroupId';
  }

  return 'institutionId';
};

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
