import React, { Component } from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import {alphabeticalOrder} from '../utils'
import _ from 'lodash';

export default class SchoolsNavTree extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      selectedEntities: []
    }
  }

  componentWillMount()
  {

  }

  componentDidMount()
  {
    console.log("Inside navtree", this.props.params);
  }


  renderSubTree(node, boundaryHierarchy, visitedBoundaries, depth) {
    const boundaryDetails = this.props.boundaryDetails;
    if (boundaryDetails[node].depth == depth && depth < 5) {
      if (node && $.inArray(node, visitedBoundaries) < 0) {
        var children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        var boundary = this.props.boundaryDetails[node];
        const label = <Link key={ boundary.name || boundary.id } to={ boundary.path }><span className="node"> { _.capitalize(boundary.label) || _.capitalize(boundary.name) || _.capitalize(boundary.first_name)} </span></Link>;
        return (

          <TreeView key={ node } onClick={ this.props.onBoundaryClick.bind(null, boundary) } nodeLabel={ label } collapsed={ boundary.collapsed }>
          { (() => {
            if (children && children.length > 0) {
              ++depth
              return children.map((child, i) => {

                return this.renderSubTree(child, boundaryHierarchy, visitedBoundaries, depth)
              });
            }
          })() }
          </TreeView>
          );
      }
      }

     return null;
  }

  //boundaryDetails={this.state.boundaryDetails} boundaryParentChildMap={this.state.childrenByParentId}
  render() {
    var visitedBoundaries = [];
    const {boundariesByParentId, boundaryDetails} = this.props
    return (
      <div>
      { alphabeticalOrder(boundariesByParentId, boundaryDetails).map(function(element, i) {
        return this.renderSubTree(element, boundariesByParentId, visitedBoundaries, 0)
      }.bind(this)) }
      </div>
      );
  }
}

