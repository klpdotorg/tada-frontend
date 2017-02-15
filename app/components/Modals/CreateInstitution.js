import React, { Component } from 'react';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {checkStatus} from '../../actions/utils';
import {SERVER_API_BASE as serverApiBase} from 'config';

export const getLanguages = () => {
    return fetch(serverApiBase + 'languages/', {    
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + sessionStorage.token
      }
    }).then(checkStatus).then((languages) => {
        const langs = languages.results.map((language) => ({
          value: language.id, 
          label: language.name
        }))
        return {
          options: langs, 
          complete: true
        }
      }).catch(error => {
      console.log('request failed', error)
    })    
  }

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
      name: '',
      languages: []
    }
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  selectLanguage = (value) => {   
   this.setState({
     languages: value
   })   
 }

 render() {    
  return (
    <Modal contentLabel="Create Institution" isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal } style={ customStyles }>
    <label htmlFor="name" className="control-label">{this.props.title}</label>
    <input id="name" value={ this.props.value } type="text" className="form-control" placeholder={this.props.placeHolder} onChange={ this.handleChange } />
    <label htmlFor="languages" className="control-label">Languages</label>
    <Select.Async multi name="form-field-name" value={this.state.languages} loadOptions={getLanguages} onChange={this.selectLanguage}/>
    <div className='button' onClick={ () => {
      this.props.save(this.state)
    } }>Save</div>
    <div className='button' onClick={ this.props.closeModal }>Discard</div>
    </Modal>
    )
}

}

