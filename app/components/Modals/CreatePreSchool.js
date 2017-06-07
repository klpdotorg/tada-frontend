import React, { Component } from 'react';
import Formsy from 'formsy-react';
import 'react-select/dist/react-select.css';
import { checkStatus } from '../../actions/utils';
import { SERVER_API_BASE as serverApiBase } from 'config';
import FRC from 'formsy-react-components';
import Modal from './ModalTemplate';
import { getManagement, getLanguages, getInstitutionCategories } from '../utils';

const { Input, Textarea, Select } = FRC;

export default class CreateDistrict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      languages: [],
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
  }

  componentDidMount() {
    getLanguages().then(languages => {
      const langs = languages.results.map(language => ({
        value: language.id,
        label: language.name,
      }));
      this.setState({
        languages: {
          isLoading: false,
          list: langs,
        },
      });
    });

    getInstitutionCategories().then(categories => {
      const cat = categories.results
        .filter(cat => {
          return cat.category_type == 2;
        })
        .map(category => ({
          value: category.id,
          label: category.name,
        }));

      this.setState({
        institutionCategories: {
          isLoading: false,
          list: cat,
        },
      });
    });
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

  selectLanguage = value => {
    this.setState({
      languages: value,
    });
  };

  submitForm() {
    var myform = this.myform.getModel();
    //  console.log(myform.institutionLang)
    let copy = {};
    copy.dise_code = myform.institutionDise_code;
    //  copy.mgmt = myform.institutionMgmt;
    copy.institution_gender = myform.institutionGender;
    //  copy.languages = myform.institutionLang;
    copy.name = myform.name;
    copy.address = myform.institutionAddress;
    copy.area = myform.institutionArea;
    copy.landmark = myform.institutionLandmark;
    copy.pincode = myform.institutionPincode;
    copy.cat = myform.institutionCat;
    //  console.log(copy)
    let languages = [];

    for (let i = 0; i < myform.institutionLang.length; i++) {
      languages.push(parseInt(myform.institutionLang[i]));
    }
    copy.languages = languages;
    this.props.save(copy);
  }

  render() {
    let { languages, institutionCategories } = this.state;

    const selectOptions = [
      { value: 'co-ed', label: 'Co-Ed' },
      { value: 'boys', label: 'Boys' },
      { value: 'girls', label: 'Girls' },
    ];
    const singleSelectOptions = [{ value: '', label: 'Please select…' }, ...selectOptions];
    //  console.log(this.props);
    //  console.log(this.props.institutionCategories.list);
    return (
      <Modal
        title={this.props.title}
        contentLabel="Create Institution"
        isOpen={this.props.isOpen}
        onCloseModal={this.props.onCloseModal}
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
            placeholder={this.props.placeHolder}
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
            value={selectOptions[0].value}
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
          {/*<label htmlFor="languages" className="control-label">Languages</label>
        <Select.Async multi name="form-field-name" value={this.state.languages} loadOptions={getLanguages} onChange={this.selectLanguage}/>*/}
        </Formsy.Form>
      </Modal>
    );
  }
}
