import React from 'react';
import TreeView from 'react-treeview';
import {Link} from 'react-router';
import TadaStore from '../stores/TadaStore';

var data = [
  {id: 414, name: "Bagalkot", "boundary_type": 1},
  {id: 433, name: "Bangalore Rural", "boundary_type": 1, children: {id: 586, name: "Devanahalli"}}
];

// For the sake of simplicity, we're gonna use `defaultCollapsed`. Usually, a
// [controlled component](http://facebook.github.io/react/docs/forms.html#controlled-components)
// is preferred.
const SchoolsNavTree = React.createClass({


  getInitialData: function(){
    return data;
  },
 /* Called when a component is reacting to a props change. Invoked before render is called. */
  componentWillReceiveProps: function(nextProps){
    console.log('SchoolsNavTree componentWillReceiveProps', nextProps.boundaries);
  },

  componentDidMount: function()
  {
    console.log('Treeview componentdidmount..', this.data);

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
      node.map((boundary,i) => {
      const name= boundary.name;
      const label = <span className="node">{name}</span>;
      return (
        <Link key={boundary.id} to={`/dashboard`}>
           <TreeView key={name} nodeLabel={label} defaultCollapsed={false} >
              
              {
                this.constructSubTree(boundary.children)
              }
            </TreeView>
        </Link>
        );
     })}
    
    
  },

  render: function() {
     var data = [
     
        {id: 414, name: "Bagalkot", "boundary_type": 1},
        {id: 433, name: "Bangalore Rural", "boundary_type": 1, children: [{id: 586, name: "Devanahalli"}, {id:334, name: "Jakkasandra"}, {id:445, name: "Thimmanayakanahalli"}]}
      
];
    return (
     
      <div>
          {
            data.map((boundary,i) => {
              const name=boundary.name;
              const label = <span className="node"> {name} </span>;
              return (
              <Link key={boundary.id} to={`/dashboard`}>
                 <TreeView key={name + '|' + i} nodeLabel={label} defaultCollapsed={false} >
                    
                    {
                      this.constructSubTree(boundary.children)
                    }
                  </TreeView>
              </Link>
                );
            })}
      </div>
    );
  },
});

export default SchoolsNavTree;
