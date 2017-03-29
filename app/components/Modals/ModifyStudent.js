import React, { Component } from 'react';
import Modal from 'react-modal'
import {clone, groupBy} from 'lodash'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

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

  render() {
    return (
      <Modal contentLabel="Confirm Modal" isOpen={this.props.isOpen} onRequestClose={this.props.onCloseModal} style={customStyles}>
        <div className="">
          <div>First Name: <input value={this.state.first_name || ''} onChange={(e) => {this.changeVal(e, 'first_name')}} type='text' className='form-control'/></div>
          <div>Middle Name: <input value={this.state.middle_name || ''} onChange={(e) => {this.changeVal(e, 'middle_name')}} type='text' className='form-control'/></div>
          <div>Last Name: <input value={this.state.last_name || ''} onChange={(e) => {this.changeVal(e, 'last_name')}} type='text' className='form-control'/></div>
          <div>UID: <input value={this.state.uid || '' } onChange={(e) => {this.changeVal(e, 'uid')}} type='text' className='form-control'/></div>
          <div>Gender: <input value={this.state.gender} onChange={(e) => {this.changeVal(e, 'gender')}} type='text' className='form-control'/></div>
          <div>Language: <input value={this.state.language || 1} onChange={(e) => {this.changeVal(e, 'language')}} type='text' className='form-control'/></div>
          <div>DOB: <input value={this.state.dob} onChange={(e) => {this.changeVal(e, 'dob')}} type='date' className='form-control'/></div>
          <div>Father First Name: <input value={this.state.Father ?  this.state.Father.first_name || '' : ''} onChange={(e) => {this.changeParentVal('Father', 'first_name', e)}} type='text' className='form-control'/></div>
          <div>Father Middle Name: <input value={this.state.Father ?  this.state.Father.middle_name || '' : ''} onChange={(e) => {this.changeParentVal('Father', 'middle_name', e)}} type='text' className='form-control'/></div>
          <div>Father Last Name: <input value={this.state.Father ?  this.state.Father.last_name || '' : ''} onChange={(e) => {this.changeParentVal('Father', 'last_name', e)}} type='text' className='form-control'/></div>
          <div>Mother First Name: <input value={this.state.Mother ?  this.state.Mother.first_name || '' : ''} onChange={(e) => {this.changeParentVal('Mother', 'first_name', e)}} type='text' className='form-control'/></div>
          <div>Mother Middle Name: <input value={this.state.Mother ?  this.state.Mother.middle_name || '' : ''} onChange={(e) => {this.changeParentVal('Mother', 'middle_name', e)}} type='text' className='form-control'/></div>
          <div>Mother Last Name: <input value={this.state.Mother ?  this.state.Mother.last_name || '' : ''} onChange={(e) => {this.changeParentVal('Mother', 'last_name', e)}} type='text' className='form-control'/></div>
      </div>
      <div className='button' onClick={ () => {
                                            this.props.saveStudent(this.state)
                                          } }>Yes</div>
        <div className='button' onClick={ this.props.onCloseModal }>No</div>
      </Modal>
    )
  }

}

