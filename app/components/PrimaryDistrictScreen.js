import React from 'react';


let PrimaryDistrict = React.createClass({ 

  render() {
  	var districtId = this.props.params.districtId;
  	var boundary = this.props.boundaryDetails[districtId];
  	var districtPath = "#" + boundary.path;
    var displayelement;
    if(sessionStorage.getItem('isAdmin'))
    {
      displayelement = <div><h4 className="brand-blue heading-border-left"> Modify Details</h4>
                       <form className="form-horizontal" role="form">
                        <div className="form-group">
                          <label className="control-label col-sm-2" for="name">District Name:</label>
                          <div className="col-sm-2">          
                            <input type="text" className="form-control" id="name" value={boundary.name}/>
                          </div>
                        </div>
                        </form>
                        <div className="col-md-2"><button type="submit" className="btn btn-primary">Save</button></div>
                     </div>
    }
    else
    {
      displayelement = <div><h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
        <p>You need administrator privileges to modify Boundary details.</p>
        <h4 className="brand-blue heading-border-left"> District Details</h4>
        <p> Name: {boundary.name} </p></div>
    }
    return(
    	<div>
    		<ol className="breadcrumb">
    			<li className="active">{boundary.name}</li>
    		</ol>
    		{displayelement} 
    	</div>
    );
  }
});

export default PrimaryDistrict;  