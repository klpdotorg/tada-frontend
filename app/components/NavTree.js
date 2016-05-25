import React from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';


// For the sake of simplicity, we're gonna use `defaultCollapsed`. Usually, a
// [controlled component](http://facebook.github.io/react/docs/forms.html#controlled-components)
// is preferred.
const SchoolsNavTree = React.createClass({

  /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps: function(nextProps) {},

  componentDidMount: function() {},

  componentWillUnmount: function() {},

  handleClick: function(boundary) {
    this.props.onBoundaryClick(boundary);
  },



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
  renderSubTree: function(node, boundaryHierarchy, visitedBoundaries) {
    if (node && $.inArray(node, visitedBoundaries) < 0) {
      var children = boundaryHierarchy[node];
      visitedBoundaries.push(node);

      var boundary = this.props.boundaryDetails[node];
      const label = <Link key={ boundary.name } to={ boundary.path } onClick={ this.props.onBoundaryClick.bind(null, boundary) }><span className="node"> { boundary.name } </span></Link>;
      return (

        <TreeView key={ node } onClick={ this.props.onBoundaryClick.bind(null, boundary) } nodeLabel={ label } defaultCollapsed={ true }>
          { (() => {

              if (children && children.length > 0) {
                return children.map((child, i) => {

                  return this.renderSubTree(child, boundaryHierarchy, visitedBoundaries)
                });
              }
            })() }
        </TreeView>
        );
    }
  },

  //boundaryDetails={this.state.boundaryDetails} boundaryParentChildMap={this.state.childrenByParentId}
  render: function() {
    var copyOfMap = $.extend(true, {}, this.props.boundariesByParentId);
    var firstElement = Object.keys(copyOfMap);
    var visitedBoundaries = [];
    return (
      <div>
        { Object.keys(copyOfMap).map(function(element, i) {
            return this.renderSubTree(element, copyOfMap, visitedBoundaries)
          }.bind(this)) }
      </div>
      );


  }
});

export default SchoolsNavTree;
