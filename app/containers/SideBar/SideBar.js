import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SideBarWrapper } from '../../components/SideBar';
import { SchoolsNavTree, PermissionsNavTree, ProgramNavTree, MapAssessmentTree } from './index';
import { getEntity, setParentNode } from '../../actions';

class SideBar extends Component {
  constructor() {
    super();

    this.renderNavTree = this.renderNavTree.bind(this);
  }

  renderNavTree() {
    const { location } = this.props;

    if (location.pathname.includes('permissions')) {
      return <PermissionsNavTree />;
    }

    if (location.pathname.includes('filterprograms')) {
      return <ProgramNavTree />;
    }

    if (location.pathname.includes('mapassessments')) {
      return <MapAssessmentTree />;
    }

    return <SchoolsNavTree />;
  }

  render() {
    const { showSideBar } = this.props;

    return <SideBarWrapper showSideBar={showSideBar} renderNavTree={this.renderNavTree} />;
  }
}

SideBar.propTypes = {
  location: PropTypes.object,
  showSideBar: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    selectedPrimarySchool: state.schoolSelection.primarySchool,
  };
};

const SideBarContainer = connect(mapStateToProps, { getEntity, setParentNode })(SideBar);

export { SideBarContainer };
