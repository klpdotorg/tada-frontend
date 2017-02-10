import React, { Component } from 'react';
import Modal from 'react-modal'

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
    this.state = {
      ...props.data
    }
   }

  render() {
    return (
      <Modal contentLabel="Confirm Modal" isOpen={this.props.isOpen} onRequestClose={this.props.onCloseModal} style={customStyles}>
        {this.props.entity && <p>{this.props.message}:{this.props.entity.name}</p>}
        <div className="">
          <div className=""><input value={this.state.first_name} onChange={(e) => {this.changeVal(e, 'first_name')}} type='text' className='form-control'/></div>
          <div className=""><input value={this.state.middle_name} onChange={(e) => {this.changeVal(e, 'middle_name')}} type='text' className='form-control'/></div>
          <div className=""><input value={this.state.last_name} onChange={(e) => {this.changeVal(e, 'last_name')}} type='text' className='form-control'/></div>
          <div className=""><input value={this.state.uid} onChange={(e) => {this.changeVal(e, 'uid')}} type='text' className='form-control'/></div>
          <div className=""><input value={this.state.gender} onChange={(e) => {this.changeVal(e, 'gender')}} type='text' className='form-control'/></div>
          <div className=""><input value={this.state.language} onChange={(e) => {this.changeVal(e, 'language')}} type='text' className='form-control'/></div>
          <div className=""><input value={this.state.dob} onChange={(e) => {this.changeVal(e, 'dob')}} type='date' className='form-control'/></div>
          <div className=""><input value={this.state.fatherName} onChange={(e) => {this.changeVal(e, 'fatherName')}} type='text' className='form-control'/></div>
          <div className=""><input value={this.state.motherName} onChange={(e) => {this.changeVal(e, 'motherName')}} type='text' className='form-control'/></div>
      </div>
      <div className='button' onClick={ () => {
                                            this.props.onYes(this.props.entity)
                                          } }>Yes</div>
        <div className='button' onClick={ this.props.onCloseModal }>No</div>
      </Modal>
    )
  }

}

