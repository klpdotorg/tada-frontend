import React, { Component } from 'react';
import Modal from './ModalTemplate';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { modalStyle as customStyles } from '../../styles.js';

const { Input } = FRC;


export default class CreateDistrict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      disabled: false,
      canSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

  submitForm() {
    var myform = this.myform.getModel();

    this.props.save(myform.entityName);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <Modal
        title={this.props.title}
        contentLabel='Create Boundary'
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel='Cancel'
        submitBtnLabel='Create'
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.enableSubmitButton}
          onInvalid={this.disableSubmitButton}
          disabled={this.state.disabled}
          ref={(ref) => this.myform = ref}
        >
          <Input name="entityName" id="entityName" value="" label={this.props.placeHolder} type="text"
            placeholder={this.props.placeHolder} help="Enter the name of the entity to be created" required validations="minLength:1"
          />

        </Formsy.Form>
      </Modal>
    );
  }

}
