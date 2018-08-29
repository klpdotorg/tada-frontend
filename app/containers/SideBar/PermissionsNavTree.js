import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TreeView from 'react-treeview';
import { Link } from 'react-router';

import { capitalize } from '../../utils';
import { filterBoundaries } from './utils';
import {
  collapsedProgramEntity,
  getBoundariesEntities,
  openPermissionBoundary,
} from '../../actions/';
import { Loading, Message } from '../../components/common';

class NavTree extends Component {
  componentDidMount() {
    this.props.getBoundariesEntities([{ depth: 0, uniqueId: this.props.parentId }]);
  }

  getTreeNodes(index) {
    const nodes = this.props.entitiesByParentId[index];

    if (nodes) {
      const updatedNodes = nodes.map((node) => {
        return { entity: this.props.entities[node], uniqueId: node };
      });

      if (index !== 0) {
        return updatedNodes;
      }

      const filterEntities = filterBoundaries(updatedNodes, this.props.selectedPrimary);

      return filterEntities;
    }

    return [];
  }

  renderLabel(node, depth, collapsed) {
    const { entity } = node;
    const label =
      capitalize(entity.label) || capitalize(entity.name) || capitalize(entity.first_name);

    return (
      <Link
        key={entity.name || entity.id}
        tabIndex="0"
        onClick={() => {
          if (!collapsed) {
            this.props.getBoundariesEntities([
              {
                id: entity.id,
                depth,
                uniqueId: node.uniqueId,
              },
            ]);
          }
          this.props.openBoundary(node.uniqueId, depth);
        }}
      >
        <span>{label}</span>
      </Link>
    );
  }

  renderSubTree(node, index, depth) {
    const newDepth = depth + 1;
    const { entity } = node;
    const treeNodes = this.getTreeNodes(newDepth);
    const collapsed = this.props.uncollapsed[newDepth] === node.uniqueId;
    const name = this.renderLabel(node, newDepth, collapsed);

    if (depth >= 2) {
      return <span key={index} />;
    }

    return (
      <TreeView
        key={index}
        onClick={() => {
          this.props.getBoundariesEntities([
            {
              id: entity.id,
              depth: newDepth,
              uniqueId: node.uniqueId,
            },
          ]);
        }}
        nodeLabel={name}
        collapsed={!collapsed}
      >
        {depth <= 2 && collapsed ? (
          treeNodes.map((child, i) => {
            return this.renderSubTree(child, i + 1, newDepth);
          })
        ) : (
          <div />
        )}
        {!treeNodes.length && this.props.loading ? <Loading /> : <span />}
      </TreeView>
    );
  }

  renderBoundariesState(length) {
    if (this.props.loading && !length) {
      return <Loading />;
    }

    if (!length) {
      return <Message message="No Boundaries Found" />;
    }

    return <span />;
  }

  render() {
    const nodes = this.getTreeNodes(0);

    return (
      <div>
        {nodes.map((element, i) => {
          return this.renderSubTree(element, i, 0);
        })}
        {this.renderBoundariesState(nodes.length)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entities: state.boundaries.boundaryDetails,
    entitiesByParentId: state.boundaries.boundariesByParentId,
    uncollapsed: state.boundaries.uncollapsedEntities,
    loading: state.appstate.loadingBoundary,
    selectedPrimary: state.schoolSelection.primarySchool,
    parentId: state.profile.parentNodeId,
  };
};

NavTree.propTypes = {
  getBoundariesEntities: PropTypes.func,
  uncollapsed: PropTypes.object,
  entitiesByParentId: PropTypes.object,
  entities: PropTypes.object,
  openBoundary: PropTypes.func,
  loading: PropTypes.bool,
  selectedPrimary: PropTypes.bool,
  parentId: PropTypes.string,
};

const PermissionsNavTree = connect(mapStateToProps, {
  collapsedProgramEntity,
  getBoundariesEntities,
  openBoundary: openPermissionBoundary,
})(NavTree);

export { PermissionsNavTree };
