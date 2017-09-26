import React, { Component } from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import { alphabeticalOrder, capitalize } from '../utils';
import _ from 'lodash';

export default class SchoolsNavTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntities: [],
    };
  }

  componentWillMount() {}

  componentDidMount() {
    //console.log("Inside navtree", this.props.params);
  }

  renderLabel(boundary, depth) {
    let label =
      capitalize(boundary.label) || capitalize(boundary.name) || capitalize(boundary.first_name);

    if (depth == 4) {
      return (
        <Link key={boundary.name || boundary.id} to={boundary.path}>
          <span className="node" onClick={this.props.onBoundaryClick.bind(null, boundary, depth)}>
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
    const boundaryDetails = this.props.boundaryDetails;
    if (boundaryDetails[node].depth == depth && depth < 5) {
      if (node && $.inArray(node, visitedBoundaries) < 0) {
        var children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        var boundary = this.props.boundaryDetails[node];
        const label = this.renderLabel(boundary, depth);
        return (
          <TreeView
            key={node}
            onClick={this.props.onBoundaryClick.bind(null, boundary, depth)}
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
    const { boundaryIds, boundaryDetails } = this.props;
    console.log(boundaryIds);
    return (
      <div>
        {alphabeticalOrder(boundaryIds, boundaryDetails).map(element =>
          this.renderSubTree(element, boundaryIds, visitedBoundaries, 0),
        )}
      </div>
    );
  }
}
