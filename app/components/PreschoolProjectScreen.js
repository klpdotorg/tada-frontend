import React, {Component} from 'react';
import Button from './Button';
import {modifyBoundary, deleteBoundary, saveNewCircle, getBoundaries, selectPreschoolTree} from '../actions'
import CreateCircle from './Modals/CreateBoundary'
import ConfirmModal from './Modals/Confirm'
import { Link } from 'react-router'

export default class PreschoolProject extends Component{
  constructor(props) {
    super(props)
    this.saveProject = this.saveProject.bind(this);
    this.toggleCircleModal = this.toggleCircleModal.bind(this);
    this.saveCircle = this.saveCircle.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.state = {
      openConfirmModal: false,
      isLoading: true
    }
  }

  componentDidMount() {
  const {params} = this.props
  this.props.dispatch(selectPreschoolTree())
  this.props.dispatch({
    type: 'BOUNDARIES',
    payload: getBoundaries(1)
  }).then(() => {
    this.props.dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.districtId)
    }).then(() => {
      this.setState({
        isLoading:false
      })
    })
  })

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

  saveProject() {
    this.props.dispatch(modifyBoundary(this.props.params.projectId, this.projectName.value));
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

  render() {
    var project = this.props.boundaries.boundaryDetails[this.props.params.projectId];
    var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
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

              <div className="col-md-8">
                <button type="submit" className="btn btn-primary padded-btn" onClick={this.saveProject}>Save</button>
                <button type="submit" className="btn btn-primary padded-btn" onClick={this.showConfirmation}>Delete</button>
                <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteProject} onCloseModal={this.closeConfirmModal} entity={project.name}/>
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

    return (
      this.state.isLoading ?
      <div>Loading...</div> :
      <div>
        <ol className="breadcrumb">
          <li><Link to={district.path}>{district.name}</Link></li>
          <li className="active">{project.name}</li>
        </ol>
        <ProjectSummary  {...this.props} />
        <CreateCircle placeHolder='Circle Name' title='Create New Circle' isOpen={this.props.modal.createCircle} onCloseModal={this.toggleCircleModal} save={ this.saveCircle } />
      </div>
    )

  }
}
