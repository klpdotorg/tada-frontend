import React from 'react';
import TadaStore from '../stores/TadaStore';


let PrimaryCluster = React.createClass({ 

  render() {
  	var block = TadaStore.getBoundaryDetailsById(this.props.params.blockId);
  	var district = TadaStore.getBoundaryDetailsById(this.props.params.districtId);
  	var cluster = TadaStore.getBoundaryDetailsById(this.props.params.clusterId);
    return(<div>You are at {district.name}> {block.name}> {cluster.name}</div>);
  }
});

export default PrimaryCluster;  