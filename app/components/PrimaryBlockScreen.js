import React from 'react';
import TadaStore from '../stores/TadaStore';


let PrimaryBlock = React.createClass({ 

  render() {
  	var block = TadaStore.getBoundaryDetailsById(this.props.params.blockId);
  	var blockPath = "#" + block.path;
  	var district = TadaStore.getBoundaryDetailsById(this.props.params.districtId);
  	var districtPath = "#" + district.path;
    return(
    	<div>
    		<ol className="breadcrumb">
    			<li><a href={districtPath}>{district.name}</a></li>
    			<li className="active">{block.name}</li>
    		</ol>
    		<div className="form-heading heading-border"> Insufficient Permissions</div>
    		<p>You need administrator privileges to modify Boundary details.</p>
    		<div className="form-heading heading-border"> View Details</div>
    		<p> Name: {block.name} </p>
    	</div>
    	);
  }
});

export default PrimaryBlock;  