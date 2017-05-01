import React, { Component } from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import {alphabeticalOrder} from '../utils'
import _ from 'lodash';
import { fetchBoundaryDetails, boundaryClicked } from '../actions/';
import { getEntityType, getBoundaryType, CLUSTER } from '../reducers/utils';

export default class PermissionsNavTree extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      selectedEntities: []
    }
    this.onBoundarySelection = this.onBoundarySelection.bind(this);
  }

  componentWillMount()
  {

  }

  componentDidMount()
  {
  }

  onBoundarySelection(boundary)
  {
    //console.log("Event is:,",e);
    console.log("boundary is:,",boundary);
    this.props.dispatch(fetchBoundaryDetails(boundary.id)).then(() => {
      //If it is a cluster, you don't want to wait till they expand the node to fetch children.
      if(getBoundaryType(boundary) == CLUSTER) {
        this.props.onBoundaryClick(boundary);
      }
      this.props.dispatch(boundaryClicked(boundary));
    });
  }

  renderSubTree(node, boundaryHierarchy, visitedBoundaries, depth) {
    const boundaryDetails = this.props.boundaryDetails;
      //if boundary details not defined for node, most likely we don't want it rendered in this filtered tree..
       if(!boundaryDetails[node])
       {
          console.log("Boundary details undefined for node", node);
          return null;
       }
    if (boundaryDetails[node].depth == depth && depth < 5) {
      if (node && $.inArray(node, visitedBoundaries) < 0) {
        var children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        var boundary = this.props.boundaryDetails[node];
     
        const label = <a onClick={ this.onBoundarySelection.bind(this,boundary)}><span className="node" onClick={ this.onBoundarySelection.bind(this, boundary)}> { _.capitalize(boundary.label) || _.capitalize(boundary.name) || _.capitalize(boundary.first_name)} </span></a>;
        return (

          <TreeView key={ node } onClick={ this.props.onBoundaryClick.bind(this, boundary) } nodeLabel={ label } collapsed={ boundary.collapsed }>
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
      <div className="brand-orange">
      { alphabeticalOrder(boundariesByParentId, boundaryDetails).map(function(element, i) {
        return this.renderSubTree(element, boundariesByParentId, visitedBoundaries, 0)
      }.bind(this)) }
      </div>
      );
  }
}

