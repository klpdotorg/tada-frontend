import React from 'react';
import {modifyBoundary, deleteBoundary, saveNewInstitution, selectPreschoolTree, getBoundaries,openNode,fetchEntitiesFromServer} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import { Link } from 'react-router'
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';
import {getManagement, getLanguages, getInstitutionCategories, replaceNull} from './utils'
const { Input} = FRC;

export default class PreschoolCircle extends React.Component {

  constructor(props){
    super(props);
    this.openSchoolModal = this.openSchoolModal.bind(this);
    this.saveSchool = this.saveSchool.bind(this)
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveCircle = this.saveCircle.bind(this);
    this.deleteCircle = this.deleteCircle.bind(this);
    this.state = {
      schoolModalIsOpen: false,
      canSubmit: false,
      openConfirmModal: false,
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
  const {params} = this.props
  this.props.dispatch(openNode(params.districtId))
  this.props.dispatch(fetchEntitiesFromServer(params.districtId));
  this.props.dispatch(selectPreschoolTree());
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

  this.props.dispatch({
    type: 'BOUNDARIES',
    payload: getBoundaries(1)
  }).then(() => {
    this.props.dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.districtId)
    }).then(() => {
      this.props.dispatch(openNode(params.projectId))
      this.props.dispatch(fetchEntitiesFromServer(params.projectId))
    this.props.dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.projectId)
    }).then(() => {
      this.setState({
        isLoading:false
      })
      this.props.dispatch(openNode(params.circleId))
      this.props.dispatch(fetchEntitiesFromServer(params.circleId))
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
    // console.log(this.props.params)
    const options = {
      name: school.name,
      boundary: this.props.params.circleId,
      languages: school.languages,
      institution_gender:school.institution_gender,
      address:school.address,
      area:school.area,
      landmark:school.landmark,
      pincode:school.pincode,
      cat:school.cat,
      dise_code:school.dise_code,
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

  saveCircle() {
    var myform = this.myform.getModel();
    this.props.dispatch(modifyBoundary(this.props.params.circleId, myform.circleName));
  }

  deleteCircle() {
    let {params} = this.props
    this.props.dispatch(deleteBoundary(params.circleId, params.projectId));
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
Displayelement = (props) =>{
  var project = this.props.boundaries.boundaryDetails[this.props.params.projectId];
  var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
  var circle = this.props.boundaries.boundaryDetails[this.props.params.circleId];
  if(sessionStorage.getItem('isAdmin')) {
    return(
      <div>
        <div className='heading-border-left'>
          <h4 className="brand-blue col-md-10">Modify Details</h4>
          <Button onClick={this.toggleSchoolModal} title='Add School'/>
        </div>
        <Formsy.Form
         onValidSubmit={this.saveCircle}
         onValid={this.enableSubmitButton}
         onInvalid={this.disableSubmitButton}
         ref={(ref) => this.myform = ref}
         >
           <Input name="circleName"
            id="circleName"
            value={circle.name}
            label="Circle :" type="text"
            className="form-control"
            required
            validations="minLength:1"/>
       </Formsy.Form>
        {/*
        <form className="form-horizontal boundary-form" role="form">
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">Circle :</label>
            <div className="col-sm-2">
              <input type="text" ref={(ref) => this.circleName = ref} className="form-control" id="name" defaultValue={circle.name}/>
            </div>
          </div>
         </form>*/}
        <div className="col-md-8">
          <button type="submit" disabled={!this.state.canSubmit} className="btn btn-primary padded-btn" onClick={this.saveCircle}>Save</button>
          <button type="submit" className="btn btn-primary padded-btn" onClick={this.showConfirmation}>Delete</button>
          <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteCircle} onCloseModal={this.closeConfirmation} entity={circle.name}/>
        </div>
      </div>
      )

  }
  else {
    return(
        <div>
          <h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
          <p>You need administrator privileges to modify Boundary details.</p>
          <h4 className="brand-blue heading-border-left"> Circle Details</h4>
          <p> Name: {circle.name}</p>
        </div>
      )
  }
}

  render() {
    var project = this.props.boundaries.boundaryDetails[this.props.params.projectId];
    var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
    var circle = this.props.boundaries.boundaryDetails[this.props.params.circleId];
    return (
      this.state.isLoading ?
      <div>Loading...</div> :
      <div>
       <ol className="breadcrumb">
          <li><Link to={district.path}>{district.name}</Link></li>
          <li><Link to={project.path}>{project.name}</Link></li>
          <li className="active">{circle.name}</li>
        </ol>
        {this.Displayelement(...this.props)}
        <CreateInstitution languages={this.state.languages} mgmt={this.state.mgmt} institutionCategories={this.state.institutionCategories} placeHolder='School Name' title='Create New School' isOpen={this.props.modal.createInstitution} onCloseModal={this.toggleSchoolModal} save={ this.saveSchool } />
      </div>
    )
  }
};
