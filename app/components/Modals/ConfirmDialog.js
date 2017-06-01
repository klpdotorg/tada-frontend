import React, { Component } from 'react';
import Modal from 'react-modal';
import { modalStyle as customStyles } from '../../styles.js';

export default class ConfirmDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        contentLabel="Confirm Modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onCloseModal}
        style={customStyles}
      >
        {this.props.entity &&
          <p className="text-warning">{this.props.message}:{this.props.entity.name}</p>}
        {!this.props.entity && <p className="text-warning">{this.props.message}</p>}
        <button
          className="btn btn-primary"
          onClick={() => {
            this.props.onYes(this.props.entity);
          }}
        >
          Yes
        </button>
        <button className="btn btn-primary" onClick={this.props.onCloseModal}>No</button>
      </Modal>
    );
  }
}
