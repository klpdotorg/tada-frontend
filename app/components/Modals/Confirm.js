import React, { Component } from 'react';
import Modal from './ModalTemplate'
import { modalStyle as customStyles } from '../../styles.js';


export default class Confirm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <Modal
        title='Delete?'
        contentLabel='Confirm Delete Modal'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={true}
        submitForm={() => {
          this.props.onAgree(this.state.value)
        }}
        cancelBtnLabel='No'
        submitBtnLabel='Yes'
      >
        <p className="text-warning">Are you sure you want to delete: <b> {this.props.entity}</b>?</p>
      </Modal>
    )
  }

}

