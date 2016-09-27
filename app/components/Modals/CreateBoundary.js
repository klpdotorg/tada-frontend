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
      <Modal isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal } style={ customStyles }>
        <label htmlFor="district" className="control-label">{this.props.title}</label>
        <input id="district" value={ this.props.value } type="text" className="form-control" placeholder={this.props.placeHolder} onChange={ this.handleChange } />
        <div className='button' onClick={ () => {
                                            this.props.save(this.state.value)
                                          } }>Save</div>
        <div className='button' onClick={ this.props.closeModal }>Discard</div>
      </Modal>
    )
  }

}

