import React, {Component} from 'react';
import Button from './Button';
import {modifyBoundary, deleteBoundary} from '../actions'
import CreateSchool from './Modals/CreateBoundary'

export default class PreschoolProject extends Component{ 
  constructor(props) {
    super(props)    
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveSchool = this.saveCircle.bind(this);
    this.saveCircle = this.saveCircle.bind(this);
    this.deleteCircle = this.deleteCircle.bind(this);
  }

  toggleSchoolModal() {
    // this.props.dispatch({
    //   type: 'TOGGLE_MODAL',
    //   modal: 'createCircle'
    // })
  }

  saveSchool(name) {
    const options = {
      name,
      parent: this.props.params.circleId,
      boundary_type: 2,
      boundary_category: 12
    }
    //this.props.dispatch(saveNewCircle(options))
  }

  saveCircle(circleId) {
    this.props.dispatch(modifyBoundary(circleId, this.circleName.value));
  }

  deleteCircle(circleId) {
    this.props.dispatch(deleteBoundary(circleId))
  }

  render() {    
    var circle = this.props.boundaryDetails[this.props.params.circleId];
    var project = this.props.boundaryDetails[this.props.params.projectId];
    var district = this.props.boundaryDetails[this.props.params.districtId];    
    let CircleSummary

    if(sessionStorage.getItem('isAdmin')) {
      CircleSummary = (props) => 
        <div>
          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button onClick={this.toggleSchoolModal} title='Add School'/>
          </div>
          
            <form className="form-horizontal boundary-form" role="form">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">Project :</label>
                <div className="col-sm-2">          
                  <input type="text" ref={(ref) => this.circleName = ref} className="form-control" id="name" defaultValue={circle.name}/>
                </div>
              </div>
              </form>

              <div className="col-md-2">
                <button type="submit" className="btn btn-primary" onClick={() => {this.saveCircle(circle.id)}}>Save</button>
                <button type="submit" className="btn btn-primary" onClick={() => {this.deleteCircle(circle.id)}}>Delete</button>
              </div>
        </div>
    }
    else {
      CircleSummary = (props) => 
       <div>        
          <h4 className="heading-border heading-warn"> Limited Permissions</h4>
          <p>You need administrator privileges to modify Boundary details. But you may add institutions here.</p>
          <h4 className="heading-border brand-blue"> View Details</h4>
        </div>
    }
    
    return(
      <div>       
        <ol className="breadcrumb">
          <li><a href={district.path}>{district.name}</a></li>
          <li><a href={project.path}>{project.name}</a></li>
          <li className="active">{circle.name}</li>     
        </ol>      
        <CircleSummary  {...this.props} />
        <CreateSchool placeHolder='Circle Name' title='Create New Circle' isOpen={this.props.modal.createCircle} onCloseModal={this.toggleCircleModal} closeModal={ this.toggleCircleModal} save={ this.saveCircle } />
      </div>
      )
  }
}