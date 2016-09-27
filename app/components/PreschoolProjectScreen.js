import React, {Component} from 'react';
import Button from './Button';
import {modifyBoundary, deleteBoundary, saveNewCircle} from '../actions'
import CreateCircle from './Modals/CreateBoundary'

export default class PreschoolProject extends Component{ 
  constructor(props) {
    super(props)
    this.saveProject = this.saveProject.bind(this);
    this.toggleCircleModal = this.toggleCircleModal.bind(this);
    this.saveCircle = this.saveCircle.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  toggleCircleModal() {
    this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createCircle'
    })
  }

  saveCircle(name) {
    const options = {
      name,
      parent: this.props.params.projectId,
      boundary_type: 2,
      boundary_category: 15
    }
    this.props.dispatch(saveNewCircle(options))
  }

  saveProject(projectId) {
    this.props.dispatch(modifyBoundary(projectId, this.projectName.value));
  }

  deleteProject(projectId) {
    this.props.dispatch(deleteBoundary(projectId))
  }

  render() {    
    var project = this.props.boundaryDetails[this.props.params.projectId];    
    var district = this.props.boundaryDetails[this.props.params.districtId];    
    let ProjectSummary

    if(sessionStorage.getItem('isAdmin')) {
      ProjectSummary = (props) => 
        <div>
          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button onClick={this.toggleCircleModal} title='Add Circle'/>
          </div>
          
            <form className="form-horizontal boundary-form" role="form">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">Project :</label>
                <div className="col-sm-2">          
                  <input type="text" ref={(ref) => this.projectName = ref} className="form-control" id="name" defaultValue={project.name}/>
                </div>
              </div>
              </form>

              <div className="col-md-2">
                <button type="submit" className="btn btn-primary" onClick={() => {this.saveProject(project.id)}}>Save</button>
                <button type="submit" className="btn btn-primary" onClick={() => {this.deleteProject(project.id)}}>Delete</button>
              </div>
        </div>
    }
    else {
      ProjectSummary = (props) => 
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
          <li className="active">{project.name}</li>        
        </ol>      
        <ProjectSummary  {...this.props} />
        <CreateCircle placeHolder='Circle Name' title='Create New Circle' isOpen={this.props.modal.createCircle} onCloseModal={this.toggleCircleModal} closeModal={ this.toggleCircleModal} save={ this.saveCircle } />
      </div>
      )
  }
}