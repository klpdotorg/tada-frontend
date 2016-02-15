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
var preschoolChildrenByParentId = [];
var boundaryDetails=[];
var boundaries = [];

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
        boundarydetails: [],
        boundariesByParentId: []
      });
  },
	/**
   * Event handler for 'change' events coming from the stores   
   */
  _onChange: function() 
  {
    //this.setState({currentSchoolSelection: TadaStore.getCurrentSchoolSelection()});
    console.log(TadaStore.getCurrentSchoolSelection());
    this.fetchBoundariesFromServer();
    
  },

  //Method fetches institutions belonging to a particular Id from the institutions endpoint
  fetchInstitutionDetails: function(parentBoundaryId)
  {
    var institutionsUrl = "http://tadadev.klp.org.in/api/v1/institutions/?";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: institutionsUrl,//TODO: Make a call that fetches only schools and districts
        data: {boundary: parentBoundaryId},
        success: function(data) 
        {
          console.log("Institution details", data.results);
          var response = data.results; 
           var childBoundaries = [];
           //Loop through and map to the local DS accordingly
          response.map((institution, i) =>{
                  var path = "";
                  
                  childBoundaries.push(institution.id);
                  parent = boundaryDetails[parentBoundaryId];
                  path = parent.path + "/institution/" + institution.id;   
                  institution.path = path;
                  boundaryDetails[institution.id]=institution;

          });
          if(parentId != 1)
          {
            childrenByParentId[parentBoundaryId]= childBoundaries;
          }
          TadaStore.setBoundaryDetails(boundaryDetails);
          this.setState( {
            boundariesByParentId: childrenByParentId,
            boundarydetails: boundaryDetails
          });               
    }.bind(this)
      });
  },

  //Method fetches boundary details from the boundaries endpoint
  fetchBoundaryDetails: function(parentBoundaryId)
  {
    if(TadaStore.getCurrentSchoolSelection() == "primary")
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
        url: "http://tadadev.klp.org.in/api/v1/boundaries/",//TODO: Make a call that fetches only schools and districts
         data: {boundary_type:2, parent: parentId},
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
                     preschoolChildrenByParentId[boundary.id] = [];
                  }
                  else
                  {
                    childBoundaries.push(boundary.id);
                    //compute boundary.path
                    if(boundary.boundary_category == "14")
                    {
                      //path is parent's path plus child's
                      parent = boundaryDetails[boundary.parent];
                      path = parent.path + "/project/" + boundary.id; 
                    }
                    else if(boundary.boundary_category == "15")
                    {
                      parent = boundaryDetails[boundary.parent];
                      path = parent.path + "/circle/" + boundary.id; 
                    }
                  
                  }
                  boundary.path = path;
                  boundaryDetails[boundary.id]=boundary;

                });
                if(parentId != 1)
                {
                  preschoolChildrenByParentId[parentId]= childBoundaries;
                }
                
                TadaStore.setBoundaryDetails(boundaryDetails);
                this.setState( {
                  boundariesByParentId: preschoolChildrenByParentId,
                  boundarydetails: boundaryDetails
                });
            }.bind(this)
      });
    }
  },

  fetchBoundariesFromServer: function(parentBoundaryId)
  {
  	var index=-1;
    //Set it to 1 if there's no parent passed in.
  	if(!parentBoundaryId)
  	{
  		parentId = 1;
  	}
  	else
  	{
  		parentId=parentBoundaryId;
  	}
  	var parentBoundaryCat = 10;
    if(TadaStore.getCurrentSchoolSelection() == "preschool")
      parentBoundaryCat = 13;
    if(this.state.boundarydetails.length >0 && parentId!=1)
    {
      parentBoundaryCat = this.state.boundarydetails[parentId].boundary_category;
    }
    //If boundary type is a circle (preschool, 15) or a cluster (primary, 11), then fetch from the instituions endpoint 
    if(parentBoundaryCat == 11 || parentBoundaryCat == 15)
    {
      this.fetchInstitutionDetails(parentId);
    }
    else
    {
      this.fetchBoundaryDetails(parentId);
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
  	this.fetchBoundariesFromServer(boundary.id);
  },

  render: function() {
  	console.log('Rendering TadaContainer');
    
    return(
    <div>
    	<NavBar/>
		<SecondaryNavBar/>
		<MainContentWrapper onBoundaryClick={this.handleBoundaryClick} boundaryDetails={this.state.boundarydetails} boundaryParentChildMap={this.state.boundariesByParentId} children={this.props.children}/>
    </div>);
  }
});

export default TadaContainer;  