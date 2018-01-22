import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';

import { SideBarWrapper } from '../../components/SideBar';
import { SchoolsNavTree, PermissionsNavTree, ProgramNavTree } from './index';
import { getEntity, setParentNode } from '../../actions';
import { DEFAULT_PARENT_NODE_ID } from 'config';

class SideBar extends Component {
  constructor() {
    super();

    this.renderNavTree = this.renderNavTree.bind(this);
  }

  componentDidMount() {
    // this.props.getEntity(DEFAULT_PARENT_NODE_ID);
    // this.props.setParentNode(DEFAULT_PARENT_NODE_ID);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedPrimarySchool !== nextProps.selectedPrimarySchool) {
      this.props.getEntity(DEFAULT_PARENT_NODE_ID);
      this.props.setParentNode(DEFAULT_PARENT_NODE_ID);
    }
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
  selectedPrimarySchool: PropTypes.bool,
  getEntity: PropTypes.func,
  setParentNode: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    selectedPrimarySchool: state.schoolSelection.primarySchool,
  };
};

const SideBarContainer = connect(mapStateToProps, { getEntity, setParentNode })(SideBar);

export { SideBarContainer };
