import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import { Modal } from '../Modal';

const { Input } = FRC;

class CreateBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      canSubmit: false,
    };

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
    const { parent, parentNodeId } = this.props;

    const myform = this.myform.getModel();

    this.props.save(myform.entityName, parent, parentNodeId);
  }

  render() {
    const { canSubmit } = this.state;
    const { title, isOpen, placeHolder } = this.props;

    return (
      <Modal
        title={title}
        contentLabel="Create Boundary"
        isOpen={isOpen}
        onCloseModal={this.props.onCloseModal}
        canSubmit={canSubmit}
        submitForm={this.submitForm}
        cancelBtnLabel="Cancel"
        submitBtnLabel="Create"
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.enableSubmitButton}
          onInvalid={this.disableSubmitButton}
          disabled={this.state.disabled}
          ref={(ref) => { return (this.myform = ref); }}
        >
          <Input
            name="entityName"
            id="entityName"
            value=""
            label={placeHolder}
            type="text"
            placeholder={placeHolder}
            help="Enter the name of the entity to be created"
            required
            validations="minLength:1"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateBoundary.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  placeHolder: PropTypes.string,
  parent: PropTypes.number,
  parentNodeId: PropTypes.string,
  onCloseModal: PropTypes.func,
  save: PropTypes.func,
};

export { CreateBoundary };
