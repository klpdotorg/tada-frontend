import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';

import { SideBarWrapper } from '../../components/SideBar';
import { SchoolsNavTree, PermissionsNavTree, ProgramNavTree, MapAssessmentTree } from './index';
import { getEntity, setParentNode } from '../../actions';

class SideBar extends Component {
  constructor() {
    super();

    this.renderNavTree = this.renderNavTree.bind(this);
  }

  toggleTree(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
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
    return <SideBarWrapper toggleTree={this.toggleTree} renderNavTree={this.renderNavTree} />;
  }
}

SideBar.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    selectedPrimarySchool: state.schoolSelection.primarySchool,
  };
};

const SideBarContainer = connect(mapStateToProps, { getEntity, setParentNode })(SideBar);

export { SideBarContainer };
