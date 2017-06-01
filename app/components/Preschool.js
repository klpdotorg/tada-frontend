import React from 'react';
import ConfirmModal from './Modals/Confirm'
import {deleteInstitution, saveInstitution, saveNewClass, getBoundaries, getInstitutions, selectPreschoolTree,openNode,fetchEntitiesFromServer} from '../actions'
import Button from './Button'
import CreateClass from './Modals/CreateClass'
import {mapValues} from 'lodash'
import Formsy from 'formsy-react';
// import Select from 'react-select';
import FRC from 'formsy-react-components';
import {getManagement, getLanguages, getInstitutionCategories, replaceNull} from './utils'
import { Link } from 'react-router'
const { Input ,Textarea,Select} = FRC;
export default class Institution extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      openConfirmModal: false,
      institution: this.props.boundaries.boundaryDetails[this.props.params.institutionId],
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
    this.saveInsti = this.saveInsti.bind(this)
    this.saveClass = this.saveClass.bind(this)
    this.toggleClassModal = this.toggleClassModal.bind(this)
    this.deleteInstitution = this.deleteInstitution.bind(this)

  }

  componentDidMount() {
  const {dispatch, params} = this.props
  dispatch(openNode(params.districtId))
  dispatch(fetchEntitiesFromServer(params.districtId));
  this.props.dispatch(selectPreschoolTree())
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
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(1)
    }).then(() =>{
      dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.districtId)
    }).then(() =>{
        dispatch(openNode(params.projectId))
        dispatch(fetchEntitiesFromServer(params.projectId))
        dispatch({
          type: 'BOUNDARIES',
          payload: getBoundaries(params.projectId)
        }).then(() =>{
            dispatch(openNode(params.circleId))
            dispatch(fetchEntitiesFromServer(params.circleId))
            dispatch({
              type: 'BOUNDARIES',
              payload: getInstitutions(params.circleId)
            }).then(() => {
                this.setState({
                  isLoading:false
                })
                dispatch(openNode(params.institutionId))
                dispatch(fetchEntitiesFromServer(params.institutionId))
              })
            })
      })
    })

  }

  componentWillReceiveProps(props) {
      let institution =  props.boundaries.boundaryDetails[props.params.institutionId]
      institution = replaceNull(props.boundaries.boundaryDetails[props.params.institutionId])
      this.setState({
        institution
      })
    }

  saveInsti() {
    const institution = {
      ...this.state.institution,
      id: this.props.params.institutionId
    }


    this.props.dispatch(saveInstitution(institution))
  }

  toggleClassModal() {
   this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createClass'
    })
  }

  saveClass(name,section,group_type) {
    const institution = this.props.params.institutionId
    const options = {
      name,
      institution,
      section,
      group_type
    }
    this.props.dispatch(saveNewClass(options))
  }

  selectEntity(key, val) {
    const state = {}
    state[key] = val
    this.setState(state)
  }

  showConfirmation = () => {
    this.setState({
      openConfirmModal: true
    })
  }

  closeConfirmModal = () => {
    this.setState({
      openConfirmModal: false
    })
  }

  setValue(val, key) {
    this.setState((state, props) => {
      const copy = Object.assign({}, state)
      copy.institution[key] = val
      return copy
    })
  }

  deleteInstitution() {
    this.props.dispatch(deleteInstitution(Number(this.props.params.circleId), Number(this.props.params.institutionId)))
  }

  handleChange=()=>{
    var myform = this.myform.getModel();

    let copy = this.state.institution;
    copy.dise_code = myform.institutionDise_code;
    // copy.mgmt = myform.institutionMgmt;
    copy.institution_gender = myform.institutionGender;
    copy.languages = myform.institutionLang;
    copy.name = myform.institutionName;
    copy.address = myform.institutionAddress;
    copy.area = myform.institutionArea;
    copy.landmark = myform.institutionLandmark;
    copy.pincode = myform.institutionPincode;
    copy.cat = myform.institutionCat;
    this.setState({
      institution:copy
    })

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
  const selectOptions = [
          {value: 'co-ed', label: 'Co-Ed'},
          {value: 'boys', label: 'Boys'},
          {value: 'girls', label: 'Girls'},
      ];

  const singleSelectOptions = [
      {value: '', label: 'Please select…'},
      ...selectOptions
  ];
  var project = this.props.boundaries.boundaryDetails[this.props.params.projectId];
  var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
  var circle = this.props.boundaries.boundaryDetails[this.props.params.circleId];
  var institution = this.state.institution

   if(sessionStorage.getItem('isAdmin')) {
     return(
        <div>
         <ol className="breadcrumb">
            <li><Link to={district.path}>{district.name}</Link></li>
            <li> <Link to={project.path}> {project.name}</Link></li>
            <li> <Link to={circle.path}> {circle.name}</Link></li>
            <li className="active"> {institution.name}</li>
          </ol>
              <div>
                <h4 className="text-primary col-md-10">Modify Details</h4>
                <button className="btn btn-green pull-right" title='Add Class' onClick={this.toggleClassModal}>Add Class</button>
                <div className="base-spacing-mid border-base"/>
            
                <Formsy.Form
                  onValidSubmit={this.saveInsti}
                 onValid={this.enableSubmitButton}
                 onInvalid={this.disableSubmitButton}
                 onChange={this.handleChange}
                 ref={(ref) => this.myform = ref}
                 >
                    <div className="form-group">
                      {/*<label className="control-label col-sm-2" htmlFor="name">Name:</label>*/}
                      <div className="col-sm-12">
                        <Input name="institutionName"
                         id="institutionName"
                         value={institution.name}
                         label="Name:" type="text"
                         className="form-control"
                         required
                         validations="minLength:1"/>
                      </div>
                    </div>

                    <div className="form-group">
                      {/*<label className="control-label col-sm-2" htmlFor="address">Address:</label>*/}
                      <div className="col-sm-12">
                        <Textarea
                        rows={3}
                        cols={40}
                        name="institutionAddress"
                        label="Address :"
                        value={institution.address}
                        required
                        validations="minLength:1"

                    />
                    {/*<textarea onChange={(e) => {this.setValue(e.target.value, 'address')}} className="form-control" id="address" rows="3" value={institution.address}>
                    </textarea>*/}
                  </div>
                </div>

                <div className="form-group">
                  {/*<label className="control-label col-sm-2" htmlFor="area">Area:</label>*/}
                  <div className="col-sm-12">
                    <Input name="institutionArea"
                     id="institutionArea"
                     value={institution.area}
                     label="Area:" type="text"
                     className="form-control"
                     />
                   {/*<input id="area" onChange={(e) => {this.setValue(e.target.value, 'area')}} type="text" className="form-control" value={institution.area}/>*/}
                  </div>
                </div>

                <div className="form-group">
                  {/*<label className="control-label col-sm-2" htmlFor="landmark">Landmark:</label>*/}
                  <div className="col-sm-12">
                    <Input name="institutionLandmark"
                     id="institutionLandmark"
                     value={institution.landmark}
                     label="Landmark:" type="text"
                     className="form-control"
                     />
                   {/*<input onChange={(e) => {this.setValue(e.target.value, 'landmark')}} type="text" className="form-control" id="landmark" value={institution.landmark}/>*/}
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-12">
                    <Input name="institutionPincode"
                     id="institutionPincode"
                     value={institution.pincode}
                     label="Pincode:" type="text"
                     className="form-control"
                     />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-12">
                    <Select
                    name="institutionCat"
                    label="Category:"
                    value={institution.cat}
                    options={this.state.institutionCategories.list}
                    />
                  {/*<Select name="form-field-name" value={institution.cat} options={this.state.institutionCategories.list} onChange={(val) => {this.setValue(val.value, 'cat')}} />*/}
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-12">
                    <Select
                      multiple
                      name="institutionLang"
                      label="Medium:"
                      value={institution.languages}
                      options={this.state.languages.list}
                      required
                    />
                  {/*<Select multi name="languages" value={institution.languages} options={this.state.languages.list} onChange={(val) => {this.setValue(val.map(v => v.value), 'languages')}}/>*/}
                  </div>
                </div>

               <div className="form-group">
                 <div className="col-sm-12">
                   <Select
                     name="institutionGender"
                     label="Gender:"
                     value={institution.institution_gender}
                     options={singleSelectOptions}
                     required
                   />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-12">
                    <Input name="institutionDise_code"
                       id="institutionDise_code"
                       value={institution.dise_code}
                       label="DISE Code:" type="text"
                       className="form-control"
                     />

                   </div>
                </div>
              </Formsy.Form>

            <div className="col-md-2">
              <button type="submit" className="btn btn-primary" onClick={this.saveInsti}>Save</button>
              <button type="submit" className="btn btn-primary padded-btn" onClick={this.showConfirmation}>Delete</button>
              <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteInstitution} onCloseModal={this.closeConfirmModal} entity={institution.name}/>
            </div>
          </div>
          <CreateClass placeHolder='Class Name' title='Create New Class' isOpen={this.props.modal.createClass} onCloseModal={this.toggleClassModal} save={ this.saveClass } />
        </div>
    )
}
  else {
    return(
        <div>
          <ol className="breadcrumb">
            <li><Link to={district.path}>{district.name}</Link></li>
            <li> <Link to={project.path}> {project.name}</Link></li>
            <li> <Link to={circle.path}> {circle.name}</Link></li>
            <li className="active"> {institution.name}</li>
          </ol>
          <div>
            <div className="alert alert-danger">
              <i className="fa fa-lock fa-lg" aria-hidden="true"></i> 
               Insufficient Privileges. Please contact administrator for permissions to modify the institution.
            </div>
          </div>
          <h4 className="text-primary">Institution Details</h4>
          <div className="border-base"></div>
          <div className="base-spacing-mid"></div> 
          <div>{institution.name}</div>
        </div>
      )
  }

}
  render() {
    var project = this.props.boundaries.boundaryDetails[this.props.params.projectId];
    var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
    var circle = this.props.boundaries.boundaryDetails[this.props.params.circleId];
    var institution = this.state.institution

    return (
      this.state.isLoading ?
      <div><i className="fa fa-cog fa-spin fa-lg fa-fw" /><span className="text-muted">Loading...</span></div> :<div>{this.Displayelement(...this.props)}</div>
    )

  }
};
