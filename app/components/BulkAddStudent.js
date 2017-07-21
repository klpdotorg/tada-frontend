import React, { Component } from 'react';
import { getLanguages } from './utils';
import _ from 'lodash';

const REQUIRED_FIELDS = [
  {
    value: 'first_name',
    label: 'First Name',
  },
  {
    value: 'dob',
    label: 'Date of Birth',
  },
  {
    value: 'fatherFirstName',
    label: 'Father First Name',
  },
  {
    value: 'motherFirstName',
    label: 'Mother First Name',
  },
  {
    value: 'gender',
    label: 'Gender',
  },
];

export default class BulkAddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      values: {},
      languages: {
        isLoading: true,
      },
      formError: [],
    };
    this.updateValue = this.updateValue.bind(this);
    this.validate = this.validate.bind(this);
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
  }

  updateValue(data, i) {
    this.state.values[i] = data;
    this.setState({ values: this.state.values });
  }

  validate() {
    const { values } = this.state;

    console.log(values);
    const errorList = [];
    _.forEach(values, value => {
      _.forEach(REQUIRED_FIELDS, requiredField => {
        if (!value[requiredField.value]) {
          errorList.push(requiredField.label);
        }
      });
    });

    this.setState({ formError: errorList });

    if (_.isEmpty(errorList)) {
      this.props.addStudents(this.state.values);
    }
  }

  setRequiredField(field) {
    let required = '';

    _.map(REQUIRED_FIELDS, requiredField => {
      if (_.includes(requiredField.value, field)) {
        required = '*';
      }
    });

    return required;
  }

  render() {
    if (this.state.languages.isLoading) {
      return (
        <div>
          <i className="fa fa-cog fa-spin fa-lg fa-fw" />
          <span className="text-muted">Loading...</span>
        </div>
      );
    }

    let rowsObj = [];
    for (let i = 0; i < this.state.rows; i++) {
      rowsObj.push(
        <InputRow
          languages={this.state.languages.list}
          updateValue={this.updateValue}
          index={i}
          key={i}
          formError={this.state.formError}
        />,
      );
    }

    return (
      <div>
        {!_.isEmpty(this.state.formError) &&
          <div className="alert alert-danger">
            <strong>Error:</strong>
            {` Please enter ${_.uniq(this.state.formError).join(
              ', ',
            )} fields value before submitting the form.`}
          </div>}
        <div className="table-responsive">
          <table className="table table-hover table-fixedwidth">
            <thead>
              <tr className="text-primary text-uppercase">
                <th>
                  First Name{this.setRequiredField('first_name')}
                </th>
                <th>
                  Middle Name{this.setRequiredField('middle_name')}
                </th>
                <th>
                  Last Name{this.setRequiredField('last_name')}
                </th>
                <th>
                  Government student ID{this.setRequiredField('uid')}
                </th>
                <th>
                  Gender{this.setRequiredField('gender')}
                </th>
                <th>
                  Mother Tongue{this.setRequiredField('mt')}
                </th>
                <th>
                  Date of Birth{this.setRequiredField('dob')}
                </th>
                <th>
                  Father First Name{this.setRequiredField('fatherFirstName')}
                </th>
                <th>
                  Father Middle Name{this.setRequiredField('fatherMiddleName')}
                </th>
                <th>
                  Father Last Name{this.setRequiredField('fatherLastName')}
                </th>
                <th>
                  Mother First Name{this.setRequiredField('motherFirstName')}
                </th>
                <th>
                  Mother Middle Name{this.setRequiredField('motherMiddleName')}
                </th>
                <th>
                  Mother Last Name{this.setRequiredField('motherLastName')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rowsObj}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-primary" onClick={this.validate}>
                Save
              </button>
              <button onClick={this.props.hide} className="btn btn-primary padded-btn">
                Discard
              </button>
            </div>
          </div>
          <div className="base-spacing-mid" />
        </div>
      </div>
    );
  }
}

class InputRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      dob: '',
      fatherFirstName: '',
      fatherMiddleName: '',
      fatherLastName: '',
      motherFirstName: '',
      motherMiddleName: '',
      motherLastName: '',
      uid: '',
      mt: 1,
      gender: 'male',
    };
  }

  changeVal(e, key) {
    var obj = {};
    obj[key] = e.target.value;
    this.setState(obj, () => {
      this.props.updateValue(this.state, this.props.index);
    });
  }

  render() {
    return (
      <tr className={_.includes(this.props.formError, this.props.index + '') ? 'bg-danger' : ''}>
        <td>
          <input
            value={this.state.first_name}
            onChange={e => {
              this.changeVal(e, 'first_name');
            }}
            type="text"
            className="form-control"
            required
          />
        </td>
        <td>
          <input
            value={this.state.middle_name}
            onChange={e => {
              this.changeVal(e, 'middle_name');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.last_name}
            onChange={e => {
              this.changeVal(e, 'last_name');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.uid}
            onChange={e => {
              this.changeVal(e, 'uid');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <select
            className="col-sm-1"
            onChange={e => {
              this.changeVal(e, 'gender');
            }}
            value={this.state.gender}
            className="form-control"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </td>
        <td>
          <select
            onChange={e => {
              this.changeVal(e, 'mt');
            }}
            value={this.state.mt}
            className="form-control"
            id="gender"
          >
            {this.props.languages.map((lang, i) => {
              return (
                <option key={i} value={lang.value}>
                  {_.startCase(lang.label)}
                </option>
              );
            })}
          </select>
        </td>
        <td>
          <input
            value={this.state.dob}
            onChange={e => {
              this.changeVal(e, 'dob');
            }}
            type="date"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.fatherFirstName}
            onChange={e => {
              this.changeVal(e, 'fatherFirstName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.fatherMiddleName}
            onChange={e => {
              this.changeVal(e, 'fatherMiddleName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.fatherLastName}
            onChange={e => {
              this.changeVal(e, 'fatherLastName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.motherFirstName}
            onChange={e => {
              this.changeVal(e, 'motherFirstName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.motherMiddleName}
            onChange={e => {
              this.changeVal(e, 'motherMiddleName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.motherLastName}
            onChange={e => {
              this.changeVal(e, 'motherLastName');
            }}
            type="text"
            className="form-control"
          />
        </td>
      </tr>
    );
  }
}
