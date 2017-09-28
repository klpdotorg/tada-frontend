import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import { DEFAULT_PARENT_ID } from 'config';

import { alphabeticalOrder, capitalize } from '../../utils';
import { fetchEntitiesFromServer, toggleNode, closePeerNodes } from '../../actions/';

class NavTree extends Component {
  renderLabel(boundary, depth) {
    let label =
      capitalize(boundary.label) || capitalize(boundary.name) || capitalize(boundary.first_name);

    if (depth === 4) {
      return (
        <Link key={boundary.name || boundary.id} to={boundary.path}>
          <span
            className="node"
            onClick={() => {
              this.props.onBoundaryClick(boundary, depth);
            }}
          >
            {label}
          </span>
        </Link>
      );
    }

    return (
      <Link key={boundary.name || boundary.id} to={boundary.path}>
        <span className="node">
          {label}
        </span>
      </Link>
    );
  }

  renderSubTree(node, boundaryHierarchy, visitedBoundaries, depth) {
    const { boundaryDetails, onBoundaryClick } = this.props;

    if (boundaryDetails[node].depth === depth && depth < 5) {
      if (node && $.inArray(node, visitedBoundaries) < 0) {
        const children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        const boundary = boundaryDetails[node];
        const label = this.renderLabel(boundary, depth);
        return (
          <TreeView
            key={node}
            onClick={() => {
              onBoundaryClick(boundary, depth);
            }}
            nodeLabel={label}
            collapsed={boundary.collapsed}
          >
            {(() => {
              if (children && children.length > 0) {
                ++depth;
                return children.map((child, i) => {
                  return this.renderSubTree(child, boundaryHierarchy, visitedBoundaries, depth);
                });
              }
            })()}
          </TreeView>
        );
      }
    }

    return null;
  }

  //boundaryDetails={this.state.boundaryDetails} boundaryParentChildMap={this.state.childrenByParentId}
  render() {
    const visitedBoundaries = [];
    const { boundariesByParentId, boundaryDetails } = this.props;
    return (
      <div>
        {alphabeticalOrder(boundariesByParentId, boundaryDetails).map(element =>
          this.renderSubTree(element, boundariesByParentId, visitedBoundaries, 0),
        )}
      </div>
    );
  }
}

const filterBoundaries = (type, boundariesByParentId, boundaryDetails) => {
  const boundaryIds = _.clone(boundariesByParentId);

  boundaryIds[DEFAULT_PARENT_ID] = _.filter(boundariesByParentId[DEFAULT_PARENT_ID], key => {
    const boundaryType = boundaryDetails[key].type;
    return boundaryType === type;
  });

  return boundaryIds;
};

const mapStateToProps = state => {
  const { boundaryDetails, boundariesByParentId } = state.boundaries;
  const selectedSchoolType = state.schoolSelection.primarySchool ? 'primary' : 'pre';

  return {
    boundariesByParentId: filterBoundaries(
      selectedSchoolType,
      boundariesByParentId,
      boundaryDetails,
    ),
    boundaryDetails: state.boundaries.boundariesByParentId,
  };
};

const mapDispatchToProps = dispatch => ({
  onBoundaryClick: (boundary, depth) => {
    dispatch(toggleNode(boundary.id));
    dispatch(fetchEntitiesFromServer(boundary.id));
    dispatch(closePeerNodes(boundary.id, depth));
  },
});

NavTree.propTypes = {
  boundariesByParentId: PropTypes.object,
  boundaryDetails: PropTypes.object,
  onBoundaryClick: PropTypes.func,
};

const SchoolsNavTree = connect(mapStateToProps, mapDispatchToProps)(NavTree);

export { SchoolsNavTree };
