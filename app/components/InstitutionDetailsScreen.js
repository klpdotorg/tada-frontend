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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <ol className="breadcrumb">
              <li><a href={districtPath}>{district.name}</a></li>
              <li> <a href={blockPath}> {block.name}</a></li>
              <li> <a href={clusterPath}> {cluster.name}</a></li>
              <li className="active"> {institution.name}</li>
            </ol>   
            <div className="row form-container">
              <div className="col-md-1"></div>
              <div className="col-md-9">
                <div className="form-heading heading-border"> Modify Details </div>

                <form className="form-horizontal" role="form">
                  <div className="form-group">
                    <label className="control-label col-sm-2" for="name">Name:</label>
                    <div className="col-sm-10">          
                      <input type="text" className="form-control" id="name" value={institution.name}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-sm-2" for="address">Address:</label>
                    <div className="col-sm-10">          
                      <textarea type="password" className="form-control" id="address" rows="3" value={institution.address}>
                      </textarea>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-sm-2" for="pincode">Pincode:</label>
                    <div className="col-sm-10">          
                      <input type="text" className="form-control" id="pincode" value={institution.pincode}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-sm-2" for="category">Category:</label>
                    <div className="col-sm-10">          
                      <select className="form-control" id="category">
                        <option>Lower Primary School</option>
                        <option>Model Primary School</option>
                        <option>Higher Primary School</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-sm-2" for="medium">Medium:</label>
                    <div className="col-sm-10">          
                      <select className="form-control" id="medium">
                        <option>Kannada</option>
                        <option>Urdu</option>
                        <option>Tamil</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-sm-2" for="mgmt">Management:</label>
                    <div className="col-sm-10">          
                      <select className="form-control" id="mgmt">
                        <option>Government - State</option>
                        <option>Government - Central</option>
                        <option>Aided</option>
                        <option>Private</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-sm-2" for="disecode">DISE Code:</label>
                    <div className="col-sm-10">          
                      <input type="text" className="form-control" id="disecode" value={institution.dise_code}/>
                    </div>
                  </div>

                  <div className="form-group">        
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-2"><button type="submit" className="btn btn-primary">Add class</button></div> 
            </div>    
          </div>
        </div>

        
      <div>
        <ol className="breadcrumb">
          <li><a href={districtPath}>{district.name}</a></li>
          <li> <a href={blockPath}> {block.name}</a></li>
          <li> <a href={clusterPath}> {cluster.name}</a></li>
          <li className="active"> {institution.name}</li>
        </ol>
        <h4 className="heading-border"> Institution Details</h4>
        
        <p> Name: {institution.name} </p>

      </div></div>);

  }
});

export default Institution;  