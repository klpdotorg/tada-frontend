import React from 'react';
import TadaStore from '../stores/TadaStore';    

var PreschoolProject = React.createClass({ 

  render() { 
    console.log("Inside preschoolProject render");
  	var project = TadaStore.getBoundaryDetailsById(this.props.params.projectId);
    //Prepend the hash. Really figure out why react-router is inserting hash and get rid of it if possible
  	var projectPath = "#" + project.path;
  	var district = TadaStore.getBoundaryDetailsById(this.props.params.districtId);
  	var districtPath = "#" + district.path;
  	
    return(
    	<div>
    		<ol className="breadcrumb">
    			<li><a href={districtPath}>{district.name}</a></li>
    			<li className="active"> {project.name}</li>
    		</ol>
    		<h4 className="heading-border heading-warn"> Limited Permissions</h4>
    		<p>You need administrator privileges to modify Boundary details. But you may add institutions here.</p>
    		<h4 className="heading-border brand-blue"> View Details</h4>
    	</div>);
  }
});

export default PreschoolProject;  