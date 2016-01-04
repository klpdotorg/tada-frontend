import React from 'react';
import TreeView from 'react-treeview';
import {Link} from 'react-router';
import TadaStore from '../stores/TadaStore';


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
    console.log('Treeview componentdidmount..', this.props.boundaries);

  },

  componentWillUnmount: function()
  {
  },

  handleClick: function(boundary)
  {
    //this.props.onBoundaryClick({id: boundary.id, type: boundary.boundary_type});
  },

  constructSubTree: function(node)
  {
      if(node)
      {
      return node.map((boundary,i) => {
      const name= boundary.name;
      const label = <Link key={boundary.id | i} to={`/district/boundary.id`}><span className="node"  onClick={this.props.onBoundaryClick.bind(null,{id: boundary.id, type: boundary.boundary_type})}>{name}</span></Link>;
      return (
        //<Link key={boundary.id | i} to={`/district/boundary.id`}>
           <TreeView key={name} nodeLabel={label} defaultCollapsed={false} >

              {
                this.constructSubTree(boundary.children)
              }
            </TreeView>
       // </Link>
        );
     })}


  },

  render: function() {
    return (

      <div>
          {
            this.props.boundaries.map((boundary,i) => {
              const name=boundary.name;
              const label = <Link key={boundary.id | i} to={`/district/boundary.id`}><span className="node"  onClick={this.props.onBoundaryClick.bind(null,{id: boundary.id, type: boundary.boundary_type})}> {name} </span></Link>;
              return (
              //
                 <TreeView key={name + '|' + i} nodeLabel={label} defaultCollapsed={false} >

                    {
                      this.constructSubTree(boundary.children)
                    }
                  </TreeView>
              //</Link>
                );
            })}
      </div>
    );
  },
});

export default SchoolsNavTree;
