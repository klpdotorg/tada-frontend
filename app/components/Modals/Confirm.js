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
        <p>Are you sure you want to delete:<b> {this.props.entity}</b>?</p>
        <div className='button' onClick={ () => {
                                            this.props.onAgree(this.state.value)
                                          } }>Yes</div>
        <div className='button' onClick={ this.props.onCloseModal }>No</div>
      </Modal>
    )
  }

}

