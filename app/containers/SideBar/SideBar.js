import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';

import { SideBarWrapper } from '../../components/SideBar';
import { SchoolsNavTree, PermissionsNavTree, ProgramNavTree } from './index';

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

    return <SchoolsNavTree />;
  }

  render() {
    return <SideBarWrapper toggleTree={this.toggleTree} renderNavTree={this.renderNavTree} />;
  }
}

SideBar.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location,
});

const SideBarContainer = connect(mapStateToProps)(SideBar);

export { SideBarContainer };
