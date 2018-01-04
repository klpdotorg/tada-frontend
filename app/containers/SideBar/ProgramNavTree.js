import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import { alphabeticalOrder, capitalize, getEntityType } from '../../utils';
import { getEntity, toggleNode, closePeerNodes, collapsedProgramEntity } from '../../actions/';

class NavTree extends Component {
  renderLabel(boundary, depth) {
    const label =
      capitalize(boundary.label) || capitalize(boundary.name) || capitalize(boundary.first_name);
    if (depth >= 3) {
      const type = getEntityType(boundary);
      const path = `/filterprograms/${type}/${boundary.id}`;

      return (
        <Link key={boundary.name || boundary.id} to={path}>
          <span
            className="node"
            onClick={() => {
              // this.props.onBoundaryClick(boundary, depth);
            }}
          >
            {label}
          </span>
        </Link>
      );
    }

    return <span className="node">{label}</span>;
  }

  getTreeNodes(node) {
    const childNodes = node.boundaries || node.institutions || node.assessments;

    if (childNodes) {
      return Object.values(childNodes);
    }

    return [];
  }

  renderSubTree(node, i) {
    console.log(!this.props.uncollapsed.includes(node.id), node.id, this.props.uncollapsed);

    const treeNodes = this.getTreeNodes(node);

    return (
      <TreeView
        key={i}
        onClick={() => {
          this.props.collapsedEntity(node.id);
        }}
        nodeLabel={node.name || i}
        collapsed={!this.props.uncollapsed.includes(node.id)}
      >
        {treeNodes.map((child, index) => {
          return this.renderSubTree(child, index + 1);
        })}
      </TreeView>
    );
  }

  render() {
    const visitedBoundaries = [];
    const { boundaries } = this.props;
    return (
      <div>
        {Object.values(boundaries).map((element, i) => {
          return this.renderSubTree(element, i);
        })}
      </div>
    );
  }
}

const filterBoundaries = (type, boundariesByParentId, boundaryDetails) => {
  const boundaryIds = _.clone(boundariesByParentId);

  boundaryIds[DEFAULT_PARENT_NODE_ID] = _.filter(
    boundariesByParentId[DEFAULT_PARENT_NODE_ID],
    (key) => {
      const boundaryType = boundaryDetails[key].type;
      return boundaryType === type;
    },
  );

  return boundaryIds;
};

const mapStateToProps = (state) => {
  return {
    boundaries: state.programDetails.programDetails,
    uncollapsed: state.programDetails.uncollapsedEntities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    collapsedEntity: (id) => {
      console.log(id, 'Sending this IDDD');
      dispatch(collapsedProgramEntity(id));
    },
  };
};

NavTree.propTypes = {
  collapsedEntity: PropTypes.func,
  uncollapsed: PropTypes.object,
};

const ProgramNavTree = connect(mapStateToProps, mapDispatchToProps)(NavTree);

export { ProgramNavTree };
