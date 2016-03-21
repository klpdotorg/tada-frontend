import React from 'react';
import TadaStore from '../stores/TadaStore';


let PrimaryCluster = React.createClass({ 

  handleAddInstitution() {

  },
  
  render() {
  	var block = TadaStore.getBoundaryDetailsById(this.props.params.blockId);
  	var blockPath = "#" + block.path;
  	var district = TadaStore.getBoundaryDetailsById(this.props.params.districtId);
  	var districtPath = "#" + district.path;
  	var cluster = TadaStore.getBoundaryDetailsById(this.props.params.clusterId);
  	var clusterPath = "#" + cluster.path;
    return(
    	<div>
    		<ol className="breadcrumb">
    			<li><a href={districtPath}>{district.name}</a></li>
    			<li> <a href={blockPath}> {block.name}</a></li>
    			<li className="active"> {cluster.name}</li>
    		</ol>
        <div className="container-fluid">
  
            <div className="col-md-2"><button type="submit" className="btn btn-primary">Add Institution</button></div> 
 
         </div>
    		<h4 className="heading-border heading-warn"> Limited Permissions</h4>

    		<p>You need administrator privileges to modify Boundary details. But you may add institutions here.</p>
    		<h4 className="heading-border brand-blue"> View Details</h4>
    		<p> Name: {cluster.name} </p>
    	</div>);
  }
});

export default PrimaryCluster;  