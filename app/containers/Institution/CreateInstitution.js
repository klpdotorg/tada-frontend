import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import _ from 'lodash';

import 'react-select/dist/react-select.css';
import Modal from '../../components/Modal';

const { Input, Textarea, Select } = FRC;

class CreateInstitution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      disabled: false,
      canSubmit: false,
      languages: {
        isLoading: true,
        list: [],
      },
      mgmt: {
        isLoading: true,
        list: [],
      },
      institutionCategories: {
        isLoading: true,
        list: [],
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.selectLanguage = this.selectLanguage.bind(this);
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
      name: e.target.value,
    });
  }

  selectLanguage(value) {
    this.setState({
      languages: value,
    });
  }

  submitForm() {
    const myform = this.myform.getModel();
    const languages = [];
    const copy = {
      dise_code: myform.institutionDise_code,
      institution_gender: myform.institutionGender,
      name: myform.name,
      address: myform.institutionAddress,
      area: myform.institutionArea,
      landmark: myform.institutionLandmark,
      pincode: myform.institutionPincode,
      cat: myform.institutionCat,
    };

    myform.institutionLang(lang => {
      languages.push(parseInt(lang, 10));
    });
    copy.languages = languages;

    this.props.save(copy);
  }

  render() {
    const { institutionCategories } = this.state;
    const { title, isOpen, onCloseModal, placeHolder, languages } = this.props;

    const selectOptions = [
      { value: 'co-ed', label: 'Co-Ed' },
      { value: 'boys', label: 'Boys' },
      { value: 'girls', label: 'Girls' },
    ];

    return (
      <Modal
        title={title}
        contentLabel="Create Institution"
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        canSubmit={this.state.canSubmit}
        submitForm={this.submitForm}
      >
        <Formsy.Form
          onValidSubmit={this.submitForm}
          onValid={this.enableSubmitButton}
          onInvalid={this.disableSubmitButton}
          disabled={this.state.disabled}
          ref={ref => (this.myform = ref)}
        >
          <Input
            name="name"
            id="name"
            value=""
            label="School Name:"
            type="text"
            value=""
            placeholder={placeHolder}
            required
            validations="minLength:1"
          />
          <Textarea
            rows={3}
            cols={40}
            name="institutionAddress"
            label="Address :"
            value=""
            required
            validations="minLength:1"
          />
          <Input
            name="institutionArea"
            id="institutionArea"
            label="Area:"
            type="text"
            value=""
            className="form-control"
          />
          <Input
            name="institutionLandmark"
            id="institutionLandmark"
            label="Landmark:"
            type="text"
            value=""
            className="form-control"
          />
          <Input
            name="institutionPincode"
            id="institutionPincode"
            label="Pincode:"
            type="text"
            value=""
            className="form-control"
          />
          <Select
            name="institutionCat"
            label="Category:"
            value={_.get(institutionCategories, 'list[0].value')}
            options={institutionCategories.list}
          />
          <Select
            multiple
            name="institutionLang"
            label="Medium:"
            value={[_.get(languages, 'list[0].value')]}
            options={languages.list}
            required
          />
          <Select
            name="institutionGender"
            label="Gender:"
            value={_.get(selectOptions, '[0].value')}
            options={selectOptions}
            required
          />
          <Input
            name="institutionDise_code"
            id="institutionDise_code"
            value=""
            label="DISE Code:"
            type="text"
            className="form-control"
          />
        </Formsy.Form>
      </Modal>
    );
  }
}

CreateInstitution.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  languages: PropTypes.array,
  onCloseModal: PropTypes.func,
  save: PropTypes.func,
};

export { CreateInstitution };
