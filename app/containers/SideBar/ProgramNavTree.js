import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import { DEFAULT_PARENT_NODE_ID } from 'config';

import { alphabeticalOrder, capitalize, getEntityType } from '../../utils';
import { getEntity, toggleNode, closePeerNodes } from '../../actions/';

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

  renderSubTree(node, boundaryHierarchy, visitedBoundaries, depth) {
    const { boundaryDetails, onBoundaryClick } = this.props;

    if (boundaryDetails[node].depth === depth && depth < 5) {
      if (node && $.inArray(node, visitedBoundaries) < 0) {
        const children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        const boundary = boundaryDetails[node];
        const label = this.renderLabel(boundary, depth);
        let newDepth = depth;
        if (children && children.length) {
          newDepth += 1;
        }

        return (
          <TreeView
            key={node}
            onClick={() => {
              onBoundaryClick(node, newDepth);
            }}
            nodeLabel={label}
            collapsed={boundary.collapsed}
          >
            {children &&
              children.map((child) => {
                return this.renderSubTree(child, boundaryHierarchy, visitedBoundaries, newDepth);
              })}
          </TreeView>
        );
      }
    }

    return null;
  }

  render() {
    const visitedBoundaries = [];
    const { boundariesByParentId, boundaryDetails } = this.props;
    return (
      <div>
        {alphabeticalOrder(boundariesByParentId, boundaryDetails).map((element) => {
          return this.renderSubTree(element, boundariesByParentId, visitedBoundaries, 0);
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
  const { boundaryDetails, boundariesByParentId } = state.boundaries;
  const selectedSchoolType = state.schoolSelection.primarySchool ? 'primary' : 'pre';

  return {
    boundariesByParentId: filterBoundaries(
      selectedSchoolType,
      boundariesByParentId,
      boundaryDetails,
    ),
    boundaryDetails: state.boundaries.boundaryDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBoundaryClick: (id, depth) => {
      dispatch(toggleNode(id));
      dispatch(getEntity(id));
      dispatch(closePeerNodes(id, depth));
    },
  };
};

NavTree.propTypes = {
  boundariesByParentId: PropTypes.object,
  boundaryDetails: PropTypes.object,
  onBoundaryClick: PropTypes.func,
};

const ProgramNavTree = connect(mapStateToProps, mapDispatchToProps)(NavTree);

export { ProgramNavTree };
