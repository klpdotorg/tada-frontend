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

export default class CreateDistrict extends Component {
  render() {
    return (
      <Modal isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal } style={ customStyles }>
        <label htmlFor="district" className="control-label">District</label>
        <input id="district" type="text" className="form-control" placeholder="" />
        <div className='button'>Save</div> <div className='button'>Discard</div>
      </Modal>
    )
  }

}

