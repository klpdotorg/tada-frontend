import React from 'react';
import {modifyBoundary, deleteBoundary, saveNewInstitution, getBoundaries} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import { Link } from 'react-router'

export default class PrimaryCluster extends React.Component {

  constructor(props){
    super(props);
    this.openSchoolModal = this.openSchoolModal.bind(this);
    this.saveSchool = this.saveSchool.bind(this)
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveCluster = this.saveCluster.bind(this);
    this.deleteCluster = this.deleteCluster.bind(this);
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      isLoading: true
    };
  }

  componentDidMount() {
  const {params} = this.props
  this.props.dispatch({
    type: 'BOUNDARIES',
    payload: getBoundaries(1)
  }).then(() => {
    this.props.dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.districtId)
    }).then(() => {
    this.props.dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.blockId)
    }).then(() => {
      this.setState({
        isLoading:false
      })
    })
  })
  })


  }

  closeConfirmation = () => {
    this.setState({
      openConfirmModal: false
    })
  }

  showConfirmation = () => {
    this.setState({
      openConfirmModal: true
    })
  }


  toggleSchoolModal() {
   this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createInstitution'
    })
  }

  saveSchool(school) {
    const options = {
      name: school.name,
      boundary: this.props.params.clusterId,
      languages: school.languages.map(school => school.value)
    }
    this.props.dispatch(saveNewInstitution(options))
  }

  getLanguages() {
    return fetch(serverApiBase + 'languages/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then((languages) => {
        const langs = languages.results.map((language) => ({
          value: language.id,
          label: language.name
        }))
        return {
          options: langs,
          complete: true
        }
      }).catch(error => {
      console.log('request failed', error)
    })
  }

  openSchoolModal(){
    this.setState({
      schoolModalIsOpen: true
    })
  }

  saveCluster() {
    this.props.dispatch(modifyBoundary(this.props.params.clusterId, this.clusterName.value));
  }

  deleteCluster() {
		let {params} = this.props
    this.props.dispatch(deleteBoundary(params.clusterId, params.blockId));
  }

  render() {
  	var block = this.props.boundaries.boundaryDetails[this.props.params.blockId];
  	var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
  	var cluster = this.props.boundaries.boundaryDetails[this.props.params.clusterId];
    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) =>
        <div>
          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button onClick={this.toggleSchoolModal} title='Add School'/>
          </div>
          <form className="form-horizontal boundary-form" role="form">
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">Cluster :</label>
              <div className="col-sm-2">
                <input type="text" ref={(ref) => this.clusterName = ref} className="form-control" id="name" defaultValue={cluster.name}/>
              </div>
            </div>
           </form>
          <div className="col-md-8">
            <button type="submit" className="btn btn-primary padded-btn" onClick={this.saveCluster}>Save</button>
            <button type="submit" className="btn btn-primary padded-btn" onClick={this.showConfirmation}>Delete</button>
            <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteCluster} onCloseModal={this.closeConfirmation} entity={cluster.name}/>
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

    return (
      this.state.isLoading ?
      <div>Loading...</div> :
      <div>
       <ol className="breadcrumb">
          <li><Link to={district.path}>{district.name}</Link></li>
          <li><Link to={block.path}>{block.name}</Link></li>
          <li className="active">{cluster.name}</li>
        </ol>
        <Displayelement {...this.props}/>
        <CreateInstitution placeHolder='School Name' title='Create New School' isOpen={this.props.modal.createInstitution} onCloseModal={this.toggleSchoolModal} save={ this.saveSchool } />
      </div>
    )
  }
};

