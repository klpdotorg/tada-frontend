import React from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';

const SchoolsNavTree = React.createClass({ 
 
  renderSubTree: function(node, boundaryHierarchy, visitedBoundaries, depth) {    
    const boundaryDetails = this.props.boundaryDetails        
    if (boundaryDetails[node].depth == depth && depth < 5) {
      if (node && $.inArray(node, visitedBoundaries) < 0) {
        var children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        var boundary = this.props.boundaryDetails[node];
        const label = <Link key={ boundary.name || boundary.id } to={ boundary.path } onClick={ this.props.onBoundaryClick.bind(null, boundary) }><span className="node"> { boundary.name || boundary.first_name} </span></Link>;
        return (

          <TreeView key={ node } onClick={ this.props.onBoundaryClick.bind(null, boundary) } nodeLabel={ label } defaultCollapsed={ true }>
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

     return null
  },

  //boundaryDetails={this.state.boundaryDetails} boundaryParentChildMap={this.state.childrenByParentId}
  render: function() {
    var copyOfMap = $.extend(true, {}, this.props.boundariesByParentId);    
    var visitedBoundaries = [];
    return (
      <div>
      { Object.keys(copyOfMap).map(function(element, i) {
        return this.renderSubTree(element, copyOfMap, visitedBoundaries, 0)
      }.bind(this)) }
      </div>
      );
  }
});

export default SchoolsNavTree;
