import React from 'react';
import {modifyBoundary, deleteBoundary, saveNewInstitution, getBoundaries,openNode,fetchEntitiesFromServer} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import { Link } from 'react-router'
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';
import {getManagement, getLanguages, getInstitutionCategories, replaceNull,userHasPermissions} from './utils'

const { Input} = FRC;

export default class PrimaryCluster extends React.Component {

  constructor(props){
    super(props);
    this.openSchoolModal = this.openSchoolModal.bind(this);
    this.saveSchool = this.saveSchool.bind(this)
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveCluster = this.saveCluster.bind(this);
    this.deleteCluster = this.deleteCluster.bind(this);
    this.hasChildren = this.hasChildren.bind(this);

    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      canSubmit: false,
      languages: {
        isLoading:true,
        list:[]
      },
      mgmt: {
        isLoading: true,
        list:[]
      },
      institutionCategories: {
        isLoading: true,
        list:[]
      },
      isLoading: true
    };
  }

  componentDidMount() {
  const {params,dispatch} = this.props;
  getLanguages().then((languages) => {
    const langs = languages.results.map((language) => ({
        value: language.id,
        label: language.name
      }))
    this.setState({
      languages: {
        isLoading: false,
        list: langs
      }
    })
  })

  getManagement().then((managements) => {
    const mgmt = managements.results.map((management) => ({
      value: management.id,
      label: management.name
    }))

    this.setState({
      mgmt: {
        isLoading: false,
        list: mgmt
      }
    })
  })

  getInstitutionCategories().then((categories) => {

    const cat = categories.results.filter((cat => {
      return cat.category_type == 2
    })).map((category) => ({
      value: category.id,
      label: category.name
    }))


    this.setState({
      institutionCategories: {
        isLoading: false,
        list: cat
      }
    })
  })
  dispatch(openNode(params.districtId))
  dispatch(fetchEntitiesFromServer(params.districtId));
  dispatch({
    type: 'BOUNDARIES',
    payload: getBoundaries(1)
  }).then(() => {
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.districtId)
    }).then(() => {
    dispatch(openNode(params.blockId))
    dispatch(fetchEntitiesFromServer(params.blockId));
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.blockId)
    }).then(() => {
      this.setState({
        isLoading:false
      })
      dispatch(openNode(params.clusterId))
      dispatch(fetchEntitiesFromServer(params.clusterId));
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
      languages: school.languages,
      institution_gender:school.institution_gender,
      address:school.address,
      area:school.area,
      landmark:school.landmark,
      pincode:school.pincode,
      cat:school.cat,
      dise_code:school.dise_code,
    }
    console.log(options);
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
    var myform = this.myform.getModel();
    this.props.dispatch(modifyBoundary(this.props.params.clusterId, myform.ClusterName));
  }

  deleteCluster() {
		let {params} = this.props
    this.props.dispatch(deleteBoundary(params.clusterId, params.blockId));
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

  hasPermissions=()=> {

    return userHasPermissions(this.props.permissions,this.props.params.clusterId);
  }

   hasChildren() {
    if(this.props.boundariesByParentId[this.props.params.clusterId]) {
      return this.props.boundariesByParentId[this.props.params.clusterId].length > 0;
    }
    else
      return false;
}

  Displayelement=(props)=>{
    var block = this.props.boundaries.boundaryDetails[this.props.params.blockId];
  	var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
  	var cluster = this.props.boundaries.boundaryDetails[this.props.params.clusterId];
    let canModify = this.hasPermissions();
    let hasSchools = this.hasChildren();
    if(sessionStorage.getItem('isAdmin')) {
      return(
        <div>
          {hasSchools?<div className="alert alert-info"><i className="fa fa-info-circle fa-lg" aria-hidden="true"></i> You cannot delete this boundary until its children are deleted</div>:<div></div>}
          <h4 className="text-primary col-md-10">Modify Details</h4>
          <button className="btn btn-orange pull-right" title='Add School' onClick={this.toggleSchoolModal}>Add School</button>
          <div className="base-spacing-mid border-base"/>
          <Formsy.Form
            onValidSubmit={this.saveCluster}
            onValid={this.enableSubmitButton}
            onInvalid={this.disableSubmitButton}
            ref={(ref) => this.myform = ref}>
            <Input name="ClusterName"
              id="ClusterName"
              value={cluster.name}
              label="Cluster :" type="text"
              className="form-control"
              required validations="minLength:1"/>
          </Formsy.Form>
          <div className="col-md-8">
            <button type="submit" disabled={!this.state.canSubmit} className="btn btn-primary padded-btn" onClick={this.saveCluster}>Save</button>
            <button type="submit" className="btn btn-primary padded-btn" disabled={hasSchools} onClick={this.showConfirmation}>Delete</button>
            <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteCluster} onCloseModal={this.closeConfirmation} entity={cluster.name}/>
          </div>
        </div>
      )

    }
    else if (canModify) {
      return(
        <div>

          <div className='pull-right'>
            <button className='btn btn-primary' onClick={this.toggleSchoolModal}><i className="fa fa-university"/>Add School</button>
          </div>
          <div className="alert alert-warning">
            <i className="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i> 
             Limited permissions. You can add institutions but not modify the boundary.
          </div>
          <h4 className="text-primary"> Cluster Details</h4>
          <div className="border-base"></div>
          <div className="base-spacing-mid"></div> 
          <div>{cluster.name}</div>
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
          <h4 className="text-primary">Cluster</h4>
          <div className="border-base"></div>
          <div className="base-spacing-mid"></div> 
          <div>{cluster.name}</div>
        </div>
      );
    }
  }

  render() {
  	var block = this.props.boundaries.boundaryDetails[this.props.params.blockId];
  	var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
  	var cluster = this.props.boundaries.boundaryDetails[this.props.params.clusterId];

    return (
      this.state.isLoading ?
      <div><i className="fa fa-cog fa-spin fa-lg fa-fw" /><span className="text-muted">Loading...</span></div> :
      <div>
       <ol className="breadcrumb">
          <li><Link to={district.path}>{district.name}</Link></li>
          <li><Link to={block.path}>{block.name}</Link></li>
          <li className="active">{cluster.name}</li>
        </ol>
        {this.Displayelement(...this.props)}

        <CreateInstitution languages={this.state.languages} mgmt={this.state.mgmt} institutionCategories={this.state.institutionCategories} placeHolder='School Name' title='Create New School' isOpen={this.props.modal.createInstitution} onCloseModal={this.toggleSchoolModal} save={ this.saveSchool } />
      </div>
    )
  }
};
