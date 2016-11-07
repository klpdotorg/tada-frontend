import React from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';

// Map tree depth to Boundary Category
const mapDepthCategory = {
  0: [13,9],
  1: [14,10],
  2: [15,11]
}

// For the sake of simplicity, we're gonna use `defaultCollapsed`. Usually, a
// [controlled component](http://facebook.github.io/react/docs/forms.html#controlled-components)
// is preferred.
const SchoolsNavTree = React.createClass({ 

  /*
  Data is of the format: [
  {
    "123": [22,45,67,89]
    "22" : [1,2,3]
    "2" : [99]
    "45" : [66, 77]
  }
  ]
  */

  renderSubTree: function(node, boundaryHierarchy, visitedBoundaries, depth) {    
    if (mapDepthCategory[depth].includes(this.props.boundaryDetails[node].boundary_category)) {
      if (node && $.inArray(node, visitedBoundaries) < 0) {
        var children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        var boundary = this.props.boundaryDetails[node];
        const label = <Link key={ boundary.name } to={ boundary.path } onClick={ this.props.onBoundaryClick.bind(null, boundary) }><span className="node"> { boundary.name } </span></Link>;
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
