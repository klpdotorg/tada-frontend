import React, { Component } from 'react';
import Modal from 'react-modal'
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
      <Modal contentLabel="Confirm Delete Modal" isOpen={this.props.isOpen} onRequestClose={this.props.onCloseModal} style={customStyles}>
        <div className="" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="text-primary modal-title" id="resetPasswordTitle">Delete?</h4>
            </div>
            <div className="modal-body">
              <p className="text-warning">Are you sure you want to delete: <b> {this.props.entity}</b>?</p>
            </div>
            <div className="modal-footer">
              <button className='btn btn-primary' onClick={() => {this.props.onAgree(this.state.value)}}>Yes</button>
              <button className='btn btn-primary' onClick={this.props.onCloseModal}>No</button>
            </div>
        </div>{/* End of modal-content */}
        </div>{/*End of outer wrapping div */}
      </Modal>
          )
  }

}

