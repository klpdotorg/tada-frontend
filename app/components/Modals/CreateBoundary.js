import React, { Component } from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

const { Input } = FRC;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

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
      <Modal contentLabel="Create Boundary" isOpen={this.props.isOpen} onRequestClose={this.props.onCloseModal} style={customStyles}>
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
                <Input name="entityName" id="entityName" value="" label={this.props.placeHolder} type="text"
                  placeholder={this.props.placeHolder} help="Enter the name of the entity to be created" required validations="minLength:1"
                />

              </Formsy.Form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.onCloseModal}>Cancel</button>
              <button
                type="button" disabled={!this.state.canSubmit} className="btn btn-primary" onClick={this.submitForm}
              >Create</button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

}
