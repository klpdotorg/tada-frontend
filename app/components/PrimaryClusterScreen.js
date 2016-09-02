import React from 'react';
import {modifyBoundary, deleteBoundary} from '../actions';


export default class PrimaryCluster extends React.Component {

  constructor(props){
    super(props);
    this.onClickSaveCluster = this.onClickSaveCluster.bind(this);    
    this.onClickDeleteCluster = this.onClickDeleteCluster.bind(this);
   
  }


  onClickSaveCluster(districtid) {
    console.log(this.props)
    console.log(this.clusterName.value);
    this.props.dispatch(modifyBoundary(districtid, this.clusterName.value));
  }

  onClickDeleteCluster(districtid) {
    this.props.dispatch(deleteBoundary(districtid));
  }
  
  render() {
  	var block = this.props.boundaryDetails[this.props.params.blockId];
  	var blockPath = "#" + block.path;
  	var district = this.props.boundaryDetails[this.props.params.districtId];
  	var districtPath = "#" + district.path;
  	var cluster = this.props.boundaryDetails[this.props.params.clusterId];
  	var clusterPath = "#" + cluster.path;
    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) => 
        <div>
          <h4 className="brand-blue heading-border-left"> Modify Details</h4>
            <form className="form-horizontal" role="form">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">Cluster :</label>
                <div className="col-sm-2">          
                  <input type="text" ref={(ref) => this.clusterName = ref} className="form-control" id="name" defaultValue={cluster.name}/>
                </div>
              </div>
              </form>

              <div className="col-md-2">
                <button type="submit" className="btn btn-primary" onClick={() => {this.onClickSaveCluster(cluster.id) }}>Save</button>
                <button type="submit" className="btn btn-primary" onClick={() => {this.onClickDeleteCluster(cluster.id)}}>Delete</button>
              </div>
        </div>
    }
    else {
      Displayelement = (props) => 
        <div>
          <h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
          <p>You need administrator privileges to modify Boundary details.</p>
          <h4 className="brand-blue heading-border-left"> Cluster Details</h4>
          <p> Name: {cluster.name}</p>
        </div>
    }
     return(
      <div>
       <ol className="breadcrumb">
          <li><a href={districtPath}>{district.name}</a></li>
          <li><a href={blockPath}>{block.name}</a></li>
          <li className="active">{cluster.name}</li>
        </ol>
        <Displayelement {...this.props}/>
      </div>
    );   
  }
};

