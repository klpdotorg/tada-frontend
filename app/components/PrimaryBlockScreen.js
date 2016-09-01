import React from 'react';


let PrimaryBlock = React.createClass({ 

  render() {
  	var block = this.props.boundaryDetails[this.props.params.blockId];
  	var blockPath = "#" + block.path;
  	var district = this.props.boundaryDetails[this.props.params.districtId];
  	var districtPath = "#" + district.path;
    var displayelement;
    if(sessionStorage.getItem('isAdmin'))
    {
      displayelement = <div><h4 className="brand-blue heading-border-left">Modify Details</h4>
                       <form className="form-horizontal" role="form">
                        <div className="form-group">
                          <label className="control-label col-sm-2" for="name">Block</label>
                          <div className="col-sm-2">          
                            <input type="text" className="form-control" id="name" value={block.name}/>
                          </div>
                        </div>
                        </form>
                        <div className="col-md-2"><button type="submit" className="btn btn-primary">Save</button></div>
                     </div>
    }
    else
    {
      displayelement = <div><h4 className="heading-err heading-border-left brand-red"><i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
        <p>You need administrator privileges to modify Boundary details.</p>
        <h4 className="brand-blue heading-border-left"> View Details</h4>
        <p> Block: {block.name} </p></div>
    }
    return(
    	<div>
    		<ol className="breadcrumb">
    			<li><a href={districtPath}>{district.name}</a></li>
    			<li className="active">{block.name}</li>
    		</ol>
    		{displayelement}
    	</div>
    	);
  }
});

export default PrimaryBlock;  