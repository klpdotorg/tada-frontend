import React, { Component } from 'react';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {checkStatus} from '../../actions/utils';
import {SERVER_API_BASE as serverApiBase} from 'config';
import FRC from 'formsy-react-components';

const { Input } = FRC;

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
      languages: [],
      disabled: false,
      canSubmit: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    //getLanguages();
  }

   enableSubmitButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableSubmitButton() {
    this.setState({
      canSubmit: false,
    });
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

 submitForm()
 {
   var myform = this.myform.getModel();
   this.props.save({name: myform.name, languages: this.state.languages});
 }

 render() {    
  return (
    <Modal contentLabel="Create Institution" isOpen={ this.props.isOpen } onRequestClose={ this.props.onCloseModal } style={ customStyles }>

        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.onCloseModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              <Formsy.Form
                onValidSubmit={this.submitForm}
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                disabled={this.state.disabled}
                ref={(ref) => this.myform = ref}
              >
                <Input name="name" id="name" value="" label="School Name:" type="text"
                  placeholder={this.props.placeHolder} required validations="minLength:1"
                />
                <label htmlFor="languages" className="control-label">Languages</label>
                <Select.Async multi name="form-field-name" value={this.state.languages} loadOptions={getLanguages} onChange={this.selectLanguage}/>
              </Formsy.Form>
            </div>
           <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Discard</button>
              <button type="button" disabled={!this.state.canSubmit} className="btn btn-primary" onClick={this.submitForm}>Save</button>
         </div>
        </div>
      </div>
    </Modal>
    )
}

}

