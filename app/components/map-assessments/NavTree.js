import React, { Component } from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import { alphabeticalOrder } from '../../utils';
import {
  getBoundaries,
  setMapAssessmentsBoundaries,
  toggleMapAssessmentsNode,
} from '../../actions';
import _ from 'lodash';

export default class NavTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getBoundaries(1).then(res => {
      this.props.dispatch(setMapAssessmentsBoundaries(res));
    });
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.primarySelected != this.props.primarySelected) {
      getBoundaries(1).then(res => {
        this.props.dispatch(setMapAssessmentsBoundaries(res));
      });
    }
  };

  onBoundaryClick(boundary, depth) {
    this.props.dispatch(toggleMapAssessmentsNode(boundary.id));
    getBoundaries(boundary.id).then(res => {
      this.props.dispatch(setMapAssessmentsBoundaries(res));
    });
  }

  renderSubTree(node, boundaryHierarchy, visitedBoundaries, depth) {
    const boundaryDetails = this.props.boundaryDetails;
    if (boundaryDetails[node].depth == depth && depth < 3) {
      if (node && $.inArray(node, visitedBoundaries) < 0) {
        var children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        var boundary = this.props.boundaryDetails[node];
        const label = (
          <span className="node">
            {' '}
            {_.capitalize(boundary.label) ||
              _.capitalize(boundary.name) ||
              _.capitalize(boundary.first_name)}
            {' '}
          </span>
        );
        return (
          <TreeView
            key={node}
            onClick={this.onBoundaryClick.bind(this, boundary, depth)}
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

  render() {
    var visitedBoundaries = [];
    const { boundariesByParentId, boundaryDetails } = this.props;

    if (_.isEmpty(boundariesByParentId[1])) {
      return (
        <div>
          <i className="fa fa-cog fa-spin fa-lg fa-fw" />
          <span className="text-muted">Loading...</span>
        </div>
      );
    }

    return (
      <div>
        {alphabeticalOrder(boundariesByParentId, boundaryDetails).map(
          function(element, i) {
            return this.renderSubTree(element, boundariesByParentId, visitedBoundaries, 0);
          }.bind(this),
        )}
      </div>
    );
  }
}
