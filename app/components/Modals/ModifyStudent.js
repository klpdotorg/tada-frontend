import React, { Component } from 'react';
import Modal from 'react-modal'
import {clone, groupBy} from 'lodash'
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
const { Input ,Textarea,Select} = FRC;
import { modalStyle as customStyles } from '../../styles.js';


export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props)
    let relations;
    if (props.data) {
      relations = groupBy(props.data.relations, 'relation_type')
      relations = {
        Father: relations.Father[0],
        Mother: relations.Mother[0]
      }
    }
    this.state = {
      ...props.data,
      ...relations
    }

    this.changeVal = this.changeVal.bind(this)
    this.changeParentVal = this.changeParentVal.bind(this)
   }

   changeVal(e, key) {
    var obj = {}
    obj[key] = e.target.value
    this.setState(obj);
  }

  changeParentVal(parentType, key, e) {
    let obj = {
      [key]: e.target.value
    }

    this.setState({
      [parentType] : {
        ...this.state[parentType],
        ...obj
      }
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

handleChange=()=>{
  var myform = this.myform.getModel();
  let father={
    id:this.state.Father.id,
    relation_type: "Father",
    first_name:myform.fatherFirstName,
    middle_name:myform.fatherMiddleName,
    last_name:myform.fatherLastName,
  };
  let mother={
    id:this.state.Mother.id,
    relation_type: "Mother",
    first_name:myform.motherFirstName,
    middle_name:myform.motherMiddleName,
    last_name:myform.motherLastName,
  };

  // console.log(myform);
  // console.log(this.state);
  this.setState({
    first_name:myform.firstName,
    middle_name:myform.middleName,
    last_name:myform.lastName,
    uid:myform.uid,
    gender:myform.gender,
    language:myform.language,
    dob:myform.dob,
    uid:myform.uid,
    gender:myform.gender,
    language:myform.language,
    dob:myform.dob,
    Father:father,
    Mother:mother,
  })
}
  render() {
    console.log(this.props);
    const selectGender = [
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'},
        ];
    const selectLanguage = [
            {value: 'hindi', label: 'Hindi'},
            {value: 'english', label: 'English'},
        ];
    return (
      <Modal contentLabel="Confirm Modal" isOpen={this.props.isOpen} onRequestClose={this.props.onCloseModal} style={customStyles}>
        <div className=""
          style = {{overflowY:'scroll'}}>
          <Formsy.Form
            onValidSubmit={this.saveStudent}
           onValid={this.enableSubmitButton}
           onInvalid={this.disableSubmitButton}
           onChange={this.handleChange}
           ref={(ref) => this.myform = ref}
             >
             <div className="col-sm-12">
               <Input name="firstName"
                id="firstName"
                value={this.state.first_name || ''}
                label="First Name:" type="text"
                className="form-control"

                validations="minLength:1"/>
             </div>
             <div className="col-sm-12">
               <Input name="middleName"
                id="middleName"
                value={this.state.middle_name || ''}
                label="Middle Name:" type="text"
                className="form-control"

                validations="minLength:1"/>
             </div>
             <div className="col-sm-12">
               <Input name="lastName"
                id="lastName"
                value={this.state.last_name || ''}
                label="Last Name:" type="text"
                className="form-control"

                validations="minLength:1"/>
              </div>
             <div className="col-sm-12">
               <Input name="uid"
                id="uid"
                value={this.state.uid || ''}
                label="UID:" type="text"
                className="form-control"
                validations="minLength:1"/>
            </div>
             <div className="col-sm-12">
                <Select
                      name="gender"
                      label="Gender"
                      value={this.state.gender}
                      options={selectGender}
                  />

              </div>
              <div className="col-sm-12">
                  <Select
                       name="language"
                       label="language"
                       value={this.state.language}
                       options={selectLanguage}
                   />
              </div>
              <div className="col-sm-12">
               <Input name="dob"
                id="date"
                value={this.state.dob || ''}
                label="DOB:" type="date"
                className="form-control"

                validations="minLength:1"/>
              </div>
               <div className="col-sm-12">
                 <Input name="fatherFirstName"
                  id="fatherFirstName"
                  value={this.state.Father ?  this.state.Father.first_name || '' : ''}
                  label="Father First Name:"
                  type="text"
                  className="form-control"

                  validations="minLength:1"/>
              </div>
              <div className="col-sm-12">
                <Input name="fatherMiddleName"
                 id="fatherMiddleName"
                 value={this.state.Father ?  this.state.Father.middle_name || '' : ''}
                 label="Father Middle Name:"
                 type="text"
                 className="form-control"
                 validations="minLength:1"/>
              </div>
              <div className="col-sm-12">
                <Input name="fatherLastName"
                 id="fatherLastName"
                 value={this.state.Father ?  this.state.Father.last_name || '' : ''}
                 label="Father Last Name:"
                 type="text"
                 className="form-control"
                 validations="minLength:1"/>
             </div>
             <div className="col-sm-12">
               <Input name="motherFirstName"
                id="motherFirstName"
                value={this.state.Mother ?  this.state.Mother.first_name || '' : ''}
                label="Mother First Name:"
                type="text"
                className="form-control"
                validations="minLength:1"/>
            </div>
              <div className="col-sm-12">
              <Input name="motherMiddleName"
               id="motherMiddleName"
               value= {this.state.Mother ?  this.state.Mother.middle_name || '' : ''}
               label="Mother Middle Name:"
               type="text"
               className="form-control"
               validations="minLength:1"/>
            </div>
            <div className="col-sm-12">
            <Input name="motherLastName"
             id="motherLastName"
             value= {this.state.Mother ?  this.state.Mother.last_name || '' : ''}
             label="Mother Last Name:"
             type="text"
             className="form-control"
             validations="minLength:1"/>
            </div>
            {/*
            <div>

            <div>Mother Middle Name: <input value={this.state.Mother ?  this.state.Mother.middle_name || '' : ''} onChange={(e) => {this.changeParentVal('Mother', 'middle_name', e)}} type='text' className='form-control'/></div>
            <div>Mother Last Name: <input value={this.state.Mother ?  this.state.Mother.last_name || '' : ''} onChange={(e) => {this.changeParentVal('Mother', 'last_name', e)}} type='text' className='form-control'/></div>*/}
          </Formsy.Form>
    </div>

      <div className='button' onClick={ () => {
                                            this.props.saveStudent(this.state)
                                          } }>Save</div>
      <div className='button' onClick={ this.props.onCloseModal }>Discard</div>
      </Modal>
    )
  }

}
