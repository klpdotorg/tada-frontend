import React from 'react';
import {modifyBoundary, deleteBoundary} from '../actions';



export default class PrimaryDistrict extends React.Component {

  constructor(props){
    super(props);
    this.onClickSaveBlock = this.onClickSaveBlock.bind(this);    
    this.onClickDeleteBlock = this.onClickDeleteBlock.bind(this);
    this.state = {
      value: ''
    };
  }


  onClickSaveBlock(districtid) {
    console.log(this.props)
    console.log(this.blockName.value);
    this.props.dispatch(modifyBoundary(districtid, this.blockName.value));
  }

  onClickDeleteBlock(districtid) {
    this.props.dispatch(deleteBoundary(districtid));
  }

  render() {
  	var block = this.props.boundaryDetails[this.props.params.blockId];
  	var blockPath = "#" + block.path;
  	var district = this.props.boundaryDetails[this.props.params.districtId];
  	var districtPath = "#" + district.path;
    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) => 
        <div>
          <h4 className="brand-blue heading-border-left"> Modify Details</h4>
            <form className="form-horizontal" role="form">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">Block :</label>
                <div className="col-sm-2">          
                  <input type="text" ref={(ref) => this.blockName = ref} className="form-control" id="name" defaultValue={block.name}/>
                </div>
              </div>
              </form>

              <div className="col-md-2">
                <button type="submit" className="btn btn-primary" onClick={() => {this.onClickSaveBlock(block.id) }}>Save</button>
                <button type="submit" className="btn btn-primary" onClick={() => {this.onClickDeleteBlock(block.id)}}>Delete</button>
              </div>
        </div>
    }
    else {
      Displayelement = (props) => 
        <div>
          <h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
          <p>You need administrator privileges to modify Boundary details.</p>
          <h4 className="brand-blue heading-border-left"> Block Details</h4>
          <p> Name: {block.name}</p>
        </div>
    }

    return(
      <div>
       <ol className="breadcrumb">
          <li><a href={districtPath}>{district.name}</a></li>
          <li className="active">{block.name}</li>
        </ol>
        <Displayelement {...this.props}/>
      </div>
    );   
  }
};

