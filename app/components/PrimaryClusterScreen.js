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
          {hasSchools?<p className="col-md-12 bg-info"><h5><i className="fa fa-2x fa-info-circle" aria-hidden="true"></i>You cannot <small>delete this cluster until the institutions under it are deleted</small></h5></p>:<div></div>}

          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button onClick={this.toggleSchoolModal} title='Add School'/>
          </div>
          <Formsy.Form
           onValidSubmit={this.saveCluster}
           onValid={this.enableSubmitButton}
           onInvalid={this.disableSubmitButton}
           ref={(ref) => this.myform = ref}
           >
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
            <button className='btn btn-default brand-orange-bg' onClick={this.toggleSchoolModal}><i className="fa fa-university"/>Add School</button>
          </div>
          <h4 className="heading-err heading-border-left yellow-mild"> <span className="fa-stack fa-lg"> <i className="fa fa-circle fa-stack-2x yellow-mild"></i>
            <i className="fa fa-lock fa-stack-1x grey-steel"></i></span>  Limited Permissions</h4>
          <p>You need administrator privileges to modify Boundary details but you can add institutions here.</p>
          <h4 className="brand-blue heading-border-left"> Cluster Details</h4>
          <p> Name: {cluster.name}</p>
        </div>
      )
    }
    else {
       return(
        <div>
          <h4 className="heading-err heading-border-left brand-red"> <span className="fa-stack fa-lg"> <i className="fa fa-circle fa-stack-2x brand-red"></i>
            <i className="fa fa-lock fa-stack-1x fa-inverse"></i></span>  Insufficient Permissions</h4>
          <p>You need administrator privileges to modify Boundary details.</p>
          <h4 className="brand-blue heading-border-left"> Cluster Details</h4>
          <p> Name: {cluster.name}</p>
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
      <div>Loading...</div> :
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
