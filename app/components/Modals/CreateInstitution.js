import React, { Component } from 'react';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
      value: '',
      selectedLanguages: 'one'
    }
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  selectLanguage = (value) => {  
     this.setState({
       selectedLanguages: value
     })    
  }



  render() {
    var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];
    console.log(this.state.selectedLanguages)
    return (
      <Modal isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal } style={ customStyles }>
        <label htmlFor="name" className="control-label">{this.props.title}</label>
        <input id="name" value={ this.props.value } type="text" className="form-control" placeholder={this.props.placeHolder} onChange={ this.handleChange } />
        <label htmlFor="languages" className="control-label">Languages</label>
        <Select multi simpleValue name="form-field-name" value={this.state.selectedLanguages} options={options} onChange={this.selectLanguage}/>
        <div className='button' onClick={ () => {
                                            this.props.save(this.state.value)
                                          } }>Save</div>
        <div className='button' onClick={ this.props.closeModal }>Discard</div>
      </Modal>
    )
  }

}

