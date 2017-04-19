import React, { Component } from 'react';
import Modal from 'react-modal'
import { modalStyle as customStyles } from '../../styles.js';



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

