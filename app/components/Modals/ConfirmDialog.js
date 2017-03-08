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
   }

  render() {  
    return (
      <Modal contentLabel="Confirm Modal" isOpen={this.props.isOpen} onRequestClose={this.props.onCloseModal} style={customStyles}>
        {this.props.entity && <p>{this.props.message}:{this.props.entity.name}</p>}
        {!this.props.entity && <p>{this.props.message}</p>}
        <div className='button' onClick={ () => {
                                            this.props.onYes(this.props.entity)
                                          } }>Yes</div>
        <div className='button' onClick={ this.props.onCloseModal }>No</div>
      </Modal>
    )
  }

}

