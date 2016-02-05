import React from 'react';
import TadaStore from '../stores/TadaStore';


let Institution = React.createClass({ 

  render() {
  	var block = TadaStore.getBoundaryDetailsById(this.props.params.blockId);
    var blockPath = "#" + block.path;
    var district = TadaStore.getBoundaryDetailsById(this.props.params.districtId);
    var districtPath = "#" + district.path;
    var cluster = TadaStore.getBoundaryDetailsById(this.props.params.clusterId);
    var clusterPath = "#" + cluster.path;
    var institution = TadaStore.getBoundaryDetailsById(this.props.params.institutionId);
    var institutionPath = "#" + institution.path;
    return(
      <div>
        <ol className="breadcrumb">
          <li><a href={districtPath}>{district.name}</a></li>
          <li> <a href={blockPath}> {block.name}</a></li>
          <li> <a href={clusterPath}> {cluster.name}</a></li>
          <li className="active"> {institution.name}</li>
        </ol>
        <h4 className="heading-border"> Institution Details</h4>
        
        <p> Name: {institution.name} </p>
      </div>);
  }
});

export default Institution;  