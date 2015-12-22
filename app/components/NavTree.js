import React from 'react';
import TreeView from 'react-treeview';
import {Link} from 'react-router';
import TadaStore from '../stores/TadaStore';

var data = [
  {id: 1, name: "Test Boundary1"},
  {id: 2, name: "Test Boundary2"}
];

// For the sake of simplicity, we're gonna use `defaultCollapsed`. Usually, a
// [controlled component](http://facebook.github.io/react/docs/forms.html#controlled-components)
// is preferred.
const SchoolsNavTree = React.createClass({


 /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps: function(nextProps){
    console.log('SchoolsNavTree componentWillReceiveProps', nextProps.boundaries);
  },

  componentDidMount: function()
  {
    console.log('Treeview componentdidmount..')

  },

  componentWillUnmount: function()
  {
  },


  render: function() {
    return (
      <div>
          {this.props.boundaries.map((boundary,i) => {
            const name = boundary.name;
            const label = <span className="node" onClick={this.props.onBoundaryClick.bind(null,{id: boundary.id, type: boundary.boundary_type})}>{name}</span>;
            return (
              <Link key={boundary.id} to={`/district/${boundary.id}`}>
              <TreeView key={name + '|' + i} nodeLabel={label} defaultCollapsed={false} >
              </TreeView></Link>
            );
          })}
      </div>
    );
  },
});

export default SchoolsNavTree;
