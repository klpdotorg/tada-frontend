import React from 'react';
import ConfirmModal from './Modals/Confirm'
import {deleteInstitution, saveInstitution, saveNewClass, getBoundaries, getInstitutions,openNode,fetchEntitiesFromServer} from '../actions'
import Button from './Button'
import CreateClass from './Modals/CreateClass'
import {mapValues} from 'lodash';
import { Link } from 'react-router';
import Formsy from 'formsy-react';
// import Select from 'react-select';
import FRC from 'formsy-react-components';
import {getManagement, getLanguages, getInstitutionCategories, replaceNull, userHasPermissions} from './utils'

const { Input ,Textarea,Select} = FRC;

export default class Institution extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      openConfirmModal: false,
      canSubmit: false,
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
    const {params, dispatch} = this.props
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
        return cat.category_type == 1
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

    dispatch(openNode(params.districtId));
    dispatch(fetchEntitiesFromServer(params.districtId));
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(1)
    }).then(() =>{
      dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.districtId)
    }).then(() =>{
      dispatch(openNode(params.blockId));
      dispatch(fetchEntitiesFromServer(params.blockId));
      dispatch({
        type: 'BOUNDARIES',
        payload: getBoundaries(params.blockId)
      }).then(() =>{
        dispatch(openNode(params.clusterId));
        dispatch(fetchEntitiesFromServer(params.clusterId));
          dispatch({
          type: 'BOUNDARIES',
          payload: getInstitutions(params.clusterId)
        }).then(() => {
          this.setState({
            isLoading:false
          })
          dispatch(openNode(params.institutionId));
          dispatch(fetchEntitiesFromServer(params.institutionId));
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
    // console.log()
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
    this.props.dispatch(deleteInstitution(Number(this.props.params.clusterId), Number(this.props.params.institutionId)))
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

    handleChange=()=>{
      var myform = this.myform.getModel();
      // console.log(myform)

      let copy = this.state.institution;
      copy.dise_code = myform.institutionDise_code;
      copy.mgmt = myform.institutionMgmt;
      copy.institution_gender = myform.institutionGender;
      copy.languages = myform.institutionLang;
      copy.name = myform.institutionName;
      copy.address = myform.institutionAddress;
      copy.area = myform.institutionArea;
      copy.landmark = myform.institutionLandmark;
      copy.pincode = myform.institutionPincode;
      copy.cat = myform.institutionCat;
      // console.log(copy);
      this.setState({
        institution:copy
      })

    }
  Displayelement=(props)=>{
    const selectOptions = [
            {value: 'co-ed', label: 'Co-Ed'},
            {value: 'boys', label: 'Boys'},
            {value: 'girls', label: 'Girls'},
        ];

    const singleSelectOptions = [
        {value: '', label: 'Please select…'},
        ...selectOptions
    ];
    var block = this.props.boundaries.boundaryDetails[this.props.params.blockId];
    var district = this.props.boundaries.boundaryDetails[this.props.params.districtId];
    var cluster = this.props.boundaries.boundaryDetails[this.props.params.clusterId];
    let canModify = sessionStorage.getItem('isAdmin') || this.hasPermissions();
    var institution = this.state.institution
    var Displayelement;
    // console.log(canModify);
    // if(canModify){
        return(
            <div>
            <ol className="breadcrumb">
            <li><Link to={district.path}>{district.name}</Link></li>
            <li> <Link to={block.path}> {block.name}</Link></li>
            <li> <Link to={cluster.path}> {cluster.name}</Link></li>
            <li className="active"> {institution.name}</li>
            </ol>
            <div>
              {!canModify?<div>
            <span className="fa-stack fa-lg"> <i className="fa fa-circle fa-stack-2x brand-red"></i>
            <i className="fa fa-lock fa-stack-1x fa-inverse"></i></span><h4 className="heading-border-left brand-red">Insufficient Permissions</h4>
            <div className="col-md-12">You need administrator privileges or permissions to modify this institution</div>

          </div>:<div></div>}
          <h4 className="heading-border-left brand-blue col-md-10">{canModify? "Modify Details": "View Details"}</h4>
            {!canModify?null:<Button onClick={this.toggleClassModal} title='Add Class'disabled={!canModify}/>}



              <Formsy.Form
                onValidSubmit={this.saveInsti}
               onValid={this.enableSubmitButton}
               onInvalid={this.disableSubmitButton}
               onChange={this.handleChange}
               disabled={!canModify}
               ref={(ref) => this.myform = ref}
               >

                  <div className="form-group">
                  <div className="col-sm-12">
                    <Input name="institutionName"
                     id="institutionName"
                     value={institution.name}
                     label="Institution :" type="text"
                     className="form-control"
                     required
                     validations="minLength:1"/>
                  </div>
                  </div>

                  <div className="form-group">

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

                  </div>
                  </div>

                  <div className="form-group">
                  <div className="col-sm-12">
                    <Input name="institutionArea"
                     id="institutionArea"
                     value={institution.area}
                     label="Area:" type="text"
                     className="form-control"
                     />

                  </div>
                  </div>

                  <div className="form-group">

                  <div className="col-sm-12">
                    <Input name="institutionLandmark"
                     id="institutionLandmark"
                     value={institution.landmark}
                     label="Landmark:" type="text"
                     className="form-control"
                     />

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
                    <Select
                      name="institutionMgmt"
                      label="Management:"
                      value={institution.mgmt}
                      options={this.state.mgmt.list}
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

                    {!canModify?<div></div>:
                      <div className="col-md-2">
                      <button type="submit" className="btn btn-primary" onClick={this.saveInsti}>Save</button>
                      <button type="submit" className="btn btn-primary" onClick={this.showConfirmation}>Delete</button>
                      <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteInstitution} onCloseModal={this.closeConfirmModal} entity={institution.name}/>
                      </div>}

            </Formsy.Form>
            </div>
            <CreateClass placeHolder='Class Name' title='Create New Class' isOpen={this.props.modal.createClass} onCloseModal={this.toggleClassModal} save={ this.saveClass } />
            </div>

        )
    // }
    // else{
    //   return(
    //     <div>
    //       <ol className="breadcrumb">
    //       <li><Link to={district.path}>{district.name}</Link></li>
    //       <li> <Link to={block.path}> {block.name}</Link></li>
    //       <li> <Link to={cluster.path}> {cluster.name}</Link></li>
    //       <li className="active"> {institution.name}</li>
    //       </ol>
    //       <h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
    //       <p>You need administrator privileges to modify Boundary details.</p>
    //       <h4 className="brand-blue heading-border-left"> Institution Details</h4>
    //       <p> Name: {institution.name}</p>
    //     </div>
    //   )
    // }
  }
  hasPermissions=()=> {

    return userHasPermissions(this.props.permissions,this.props.params.institutionId);
  }

  render() {

    return (
          this.state.isLoading ?
          <div>Loading...</div> :
            <div>{this.Displayelement()}</div>

        )

};
}
