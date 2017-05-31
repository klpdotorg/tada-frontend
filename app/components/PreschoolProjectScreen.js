import React, {Component} from 'react';
import Button from './Button';
import {modifyBoundary, deleteBoundary, saveNewCircle, getBoundaries, selectPreschoolTree,openNode,fetchEntitiesFromServer} from '../actions'
import CreateCircle from './Modals/CreateBoundary'
import ConfirmModal from './Modals/Confirm'
import { Link } from 'react-router'
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';
const { Input} = FRC;

export default class PreschoolProject extends Component{
  constructor(props) {
    super(props)
    this.saveProject = this.saveProject.bind(this);
    this.toggleCircleModal = this.toggleCircleModal.bind(this);
    this.saveCircle = this.saveCircle.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.hasChildren = this.hasChildren.bind(this);
    this.state = {
      canSubmit: false,
      openConfirmModal: false,
      isLoading: true
    }
  }

  componentDidMount() {
    //
  const {params} = this.props
  this.props.dispatch(openNode(params.districtId))
  this.props.dispatch(fetchEntitiesFromServer(params.districtId))
  this.props.dispatch(selectPreschoolTree())
  this.props.dispatch({
    type: 'BOUNDARIES',
    payload: getBoundaries(1)
  }).then(() => {
    this.props.dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.districtId)
    }).then(() => {
      this.props.dispatch(openNode(params.projectId))
      this.setState({
        isLoading:false
      })
      this.props.dispatch(fetchEntitiesFromServer(params.projectId))
    })
  })

  }


  toggleCircleModal() {
    this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createCircle'
    })
  }

  hasChildren() {
    if(this.props.boundariesByParentId[this.props.params.projectId]) {
      return this.props.boundariesByParentId[this.props.params.projectId].length > 0;
    }
    else
      return false;
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

  saveProject() {
    var myform = this.myform.getModel();
    this.props.dispatch(modifyBoundary(this.props.params.projectId, myform.ProjectName));
  }

  closeConfirmModal = () => {
    this.setState({
      openConfirmModal: false
    })
  }

  showConfirmation = () => {
    this.setState({
      openConfirmModal: true
    })
  }

  deleteProject() {
    this.props.dispatch(deleteBoundary(this.props.params.projectId, this.props.params.districtId))
  }


  enableSubmitButton=()=> {
    this.setState({
      canSubmit: true,
    });
  }

  disableSubmitButton=()=> {
    this.setState({
      canSubmit: false,
    });
  }

ProjectSummary=(props)=>{
  var project = this.props.boundaries.boundaryDetails[this.props.params.projectId];
  var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
  let hasCircles = this.hasChildren();
  if(sessionStorage.getItem('isAdmin')) {
    return(
        <div>
          {hasCircles?<div className="alert alert-info"><i className="fa fa-info-circle fa-lg" aria-hidden="true"></i> You cannot delete this boundary until its children are deleted</div>:<div></div>}
          <h4 className="text-primary col-md-10">Modify Details</h4>
          <button className="btn btn-green pull-right" title='Add Circle' onClick={this.toggleCircleModal}>Add Circle</button>
          <div className="base-spacing-mid border-base"/>
          
          <Formsy.Form
             onValidSubmit={this.saveProject}
             onValid={this.enableSubmitButton}
             onInvalid={this.disableSubmitButton}
             ref={(ref) => this.myform = ref}>
               <Input name="ProjectName"
                  id="ProjectName"
                  value={project.name}
                  label="Project :" type="text"
                  className="form-control"
                  required validations="minLength:1"/>
          </Formsy.Form>
          <div className="col-md-8">
                <button type="submit" disabled={!this.state.canSubmit} className="btn btn-primary padded-btn" onClick={this.saveProject}>Save</button>
                <button type="submit" className="btn btn-primary padded-btn" onClick={this.showConfirmation}>Delete</button>
                <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteProject} onCloseModal={this.closeConfirmModal} entity={project.name}/>
          </div>
        </div>
      )
  }
  else {
      return(
        <div>
          <div className="alert alert-danger">
            <i className="fa fa-lock fa-lg" aria-hidden="true"></i> 
             Insufficient Privileges. Only administrators can modify boundary details.
          </div>
          <h4 className="text-primary">Project</h4>
          <div className="border-base"></div>
          <div className="base-spacing-mid"></div> 
          <div>{project.name}</div>
        </div>
    )
  }
}

  render() {
    var project = this.props.boundaries.boundaryDetails[this.props.params.projectId];
    var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
    // let ProjectSummary
    //
    // if(sessionStorage.getItem('isAdmin')) {
    //   ProjectSummary = (props) =>
    //     <div>
    //       <div className='heading-border-left'>
    //         <h4 className="brand-blue col-md-10">Modify Details</h4>
    //         <Button onClick={this.toggleCircleModal} title='Add Circle'/>
    //       </div>
    //
    //         <form className="form-horizontal boundary-form" role="form">
    //           <div className="form-group">
    //             <label className="control-label col-sm-2" htmlFor="name">Project :</label>
    //             <div className="col-sm-2">
    //               <input type="text" ref={(ref) => this.projectName = ref} className="form-control" id="name" defaultValue={project.name}/>
    //             </div>
    //           </div>
    //           </form>
    //
    //           <div className="col-md-8">
    //             <button type="submit" className="btn btn-primary padded-btn" onClick={this.saveProject}>Save</button>
    //             <button type="submit" className="btn btn-primary padded-btn" onClick={this.showConfirmation}>Delete</button>
    //             <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteProject} onCloseModal={this.closeConfirmModal} entity={project.name}/>
    //           </div>
    //     </div>
    // }
    // else {
    //   ProjectSummary = (props) =>
    //    <div>
    //       <h4 className="heading-border heading-warn"> Limited Permissions</h4>
    //       <p>You need administrator privileges to modify Boundary details. But you may add institutions here.</p>
    //       <h4 className="heading-border brand-blue"> View Details</h4>
    //     </div>
    // }

    return (
      this.state.isLoading ?
      <div><i className="fa fa-cog fa-spin fa-lg fa-fw" /><span className="text-muted">Loading...</span></div> :
      <div>
        <ol className="breadcrumb">
          <li><Link to={district.path}>{district.name}</Link></li>
          <li className="active">{project.name}</li>
        </ol>
        {this.ProjectSummary()}
        <CreateCircle placeHolder='Circle Name' title='Create New Circle' isOpen={this.props.modal.createCircle} onCloseModal={this.toggleCircleModal} save={ this.saveCircle } />
      </div>
    )

  }
}
