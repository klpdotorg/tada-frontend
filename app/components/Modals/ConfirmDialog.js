import React, { Component } from 'react';
import Modal from './ModalTemplate'
import { modalStyle as customStyles } from '../../styles.js';



export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props)
   }

  render() {
    return (
      <Modal
        title='Confirm'
        contentLabel='Confirm Modal'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={true}
        submitForm={this.props.onYes}
        submitBtnLabel='Yes'
        cancelBtnLabel='No'
      >
        <div>
          {this.props.entity && <p className="text-warning">{this.props.message}:{this.props.entity.name}</p>}
          {!this.props.entity && <p className="text-warning">{this.props.message}</p>}
        </div>
      </Modal>
    )
  }

}

