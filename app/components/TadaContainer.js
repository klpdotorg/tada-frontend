/*
This component will be the owner of state in the chain of responsibility. It encloses
all the other main content areas of TADA UI that require state storage.
*/

import React from 'react';
import NavBar from './MainNavBar';
import SecondaryNavBar from './SecondaryNavBar';
import MainContentWrapper from './MainContentWrapper';
import TadaStore from '../stores/TadaStore';

var _=require('lodash');

var parentId = 1;
var boundaries = [];
var boundaries2 = [
    {
        id: 123,
        name: 'Dharwad',
        children: [
            {
                id: 111,
                name: 'Something',
                children: [
                    {
                        id: 222,
                        name: 'Cluster 1',
                        children: [
                            {
                                id: 444,
                                name: 'Some school name',
                                
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 456,
        name: 'Karwar'
    }
];
let TadaContainer = React.createClass({ 

//In order to make REST call, need to know whether 
// 1. Primary/Preschool was clicked
// 2. Category = whether district/cluster/block etc..Initially category will be district
//But as various clicks come in (inverse flow), need to determine from that.
  getInitialState: function() 
  {
      TadaStore.getCurrentSchoolSelection();
      return {currentSchoolSelection: "primary", boundaries: []};
  },
	/**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() 
  {
    console.log('Received change from stores');
    this.setState({currentSchoolSelection: TadaStore.getCurrentSchoolSelection()});
    console.log(TadaStore.getCurrentSchoolSelection());
    this.fetchBoundariesFromServer();
    
  },

  searchAndModifyState: function(boundariesObj, key, results)
  {
  	  if(key == boundariesObj.id)
  	  {

  	  	return boundariesObj;
  	  }
  	  else {
  	  	var result=[];
  	  	for(var i in boundariesObj)
  	  	{
  	  		var element = boundariesObj[i];
  	  		if(element.id == key)
  	  		{
  	  			console.log("FOUND ELEMENT with ID ", key);
  	  			element.children = results;
  	  			break;
  	  		}
  	  		if(element.children)
  	  		{
  	  			console.log("Found a children array");
  	  			return this.searchAndModifyState(element.children,key, results);
  	  		}
  	  	}
  	  }

  },

  handleSuccessfulFetch: function(data)
  {
  	
  },

  fetchBoundariesFromServer: function(parentBoundaryId)
  {
  	var index=-1;
  	if(!parentBoundaryId)
  	{
  		parentId = 1;
  	}
  	else
  	{
  		parentId=parentBoundaryId;
  	}
  	//Set it to 1 if there's no parent passed in.
  
  	if(this.state.currentSchoolSelection == "primary")
  	{
  		$.ajax({
	      type: "GET",
	      dataType: "json",
	      url: "http://tadadev.klp.org.in/api/v1/boundaries/",//TODO: Make a call that fetches only schools and districts
	      data: {boundary_type:1, parent: parentId},
	      success: function(data) {
				console.log(data.results);
	            if(parentId == 1)
	            {
		            this.setState( {
		              boundaries: data.results
		            });
	        	}
	        	else
	        	{

	        		//manipulate the DS to set the results in the right location
	        		// Find the id=parentId in the DS and set the children accordingly
	        		var stateCopy = this.state.boundaries;
	        		stateCopy = this.searchAndModifyState(stateCopy, parentId, data.results);
	        		this.setState(stateCopy);
	        		//index.children = data.results;
	        		//this.setState({boundaries: stateCopy});
	        		//console.log(parent);
	        	}
	      }.bind(this)
	    });
  	}
  	else
  	{
  		 $.ajax({
	      type: "GET",
	      dataType: "json",
	      url: "http://tadadev.klp.org.in/api/v1/boundaries/?boundary_type=2&category=district",//TODO: Make a call that fetches only schools and districts
	      success: function(data) {
	            console.log(data.results);
	            this.setState( {
	              boundaries: data.results
	            });
	          }.bind(this)
	    });
  	}
  },

 componentDidMount: function() 
  {
    console.log('Treeview componentdidmount..')
    TadaStore.addChangeListener(this._onChange);
    this.fetchBoundariesFromServer();
  },

  componentWillUnmount: function()
  {
    TadaStore.removeChangeListener(this._onChange.bind(this));
  },

  handleBoundaryClick: function(boundary)
  {
  	console.log("On boundary click..", boundary);
  	//Now go and fetch the children from the server..and render..
  	this.fetchBoundariesFromServer(boundary.id)
  },

  render: function() {
  	console.log('Rendering TadaContainer');
    return(
    <div>
    	<NavBar/>
		<SecondaryNavBar/>
		<MainContentWrapper onBoundaryClick={this.handleBoundaryClick} boundaries={this.state.boundaries} children={this.props.children}/>
    </div>);
  }
});

export default TadaContainer;  