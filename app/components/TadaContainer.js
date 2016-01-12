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
var childrenByParentId =[];
var boundaryDetails=[];
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
      
      return( 
      {
        currentSchoolSelection: "primary", 
        boundaries: [],
        boundarydetails: [],
        boundariesByParentId: []
      });
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
                var childBoundaries = [];
                
                var response = data.results;


                //Loop through and map to the local DS accordingly
                response.map((boundary, i) =>{
                  var path = "";
                  // Special case the first case where parentId = 1. i.e. districts
                  if(parentId == 1)
                  {
                     path="/district/" + boundary.id;
                     childrenByParentId[boundary.id] = [];
                  }
                  else
                  {
                    childBoundaries.push(boundary.id);
                    //compute boundary.path
                    if(boundary.boundary_category == "10")
                    {
                      //path is parent's path plus child's
                      parent = boundaryDetails[boundary.parent];
                      path = parent.path + "/block/" + boundary.id; 
                    }
                    else if(boundary.boundary_category == "11")
                    {
                      parent = boundaryDetails[boundary.parent];
                      path = parent.path + "/cluster/" + boundary.id; 
                    }
                  
                  }
                  boundary.path = path;
                  boundaryDetails[boundary.id]=boundary;

                });
                if(parentId != 1)
                {
                  childrenByParentId[parentId]= childBoundaries;
                }
                console.log("children by parent id array", childrenByParentId);
                TadaStore.setBoundaryDetails(boundaryDetails);
                this.setState( {
                  boundariesByParentId: childrenByParentId,
                  boundarydetails: boundaryDetails
                });
	           
	        	
	        	
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
		<MainContentWrapper onBoundaryClick={this.handleBoundaryClick} boundaries={this.state.boundaries} boundaryDetails={this.state.boundarydetails} boundaryParentChildMap={this.state.boundariesByParentId} children={this.props.children}/>
    </div>);
  }
});

export default TadaContainer;  