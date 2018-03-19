import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { lastVerifiedYears } from '../../Data';

class StudentInputRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.student,
    };
  }

  changeVal(e, key) {
    const obj = {};
    obj[key] = e.target.value;
    this.setState(obj, () => {
      this.props.updateValue(
        {
          ...this.state,
          ...{
            institution: this.props.institutionId,
            status: 'AC',
          },
        },
        this.props.index,
      );
    });
  }

  render() {
    const { formErrors, index, languages } = this.props;

    return (
      <tr className={_.includes(formErrors, index) ? 'bg-danger' : ''}>
        <td>
          <input
            value={this.state.first_name}
            onChange={(e) => {
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
            onChange={(e) => {
              this.changeVal(e, 'middle_name');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.last_name}
            onChange={(e) => {
              this.changeVal(e, 'last_name');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.uid}
            onChange={(e) => {
              this.changeVal(e, 'uid');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <select
            className="col-sm-1 form-control"
            onChange={(e) => {
              this.changeVal(e, 'gender');
            }}
            value={this.state.gender}
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </td>
        <td>
          <select
            onChange={(e) => {
              this.changeVal(e, 'mt');
            }}
            value={this.state.mt}
            className="form-control"
            id="gender"
          >
            {languages.map((lang, i) => {
              return (
                <option key={i} value={lang.value}>
                  {_.startCase(lang.label)}
                </option>
              );
            })}
          </select>
        </td>
        <td>
          <select
            onChange={(e) => {
              this.changeVal(e, 'academic_year');
            }}
            value={this.state.academic_year}
            className="form-control"
            id="gender"
          >
            {lastVerifiedYears.map((year, i) => {
              return (
                <option key={i} value={year.value}>
                  {_.startCase(year.label)}
                </option>
              );
            })}
          </select>
        </td>
        <td>
          <input
            value={this.state.dob}
            onChange={(e) => {
              this.changeVal(e, 'dob');
            }}
            type="date"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.fatherFirstName}
            onChange={(e) => {
              this.changeVal(e, 'fatherFirstName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.fatherMiddleName}
            onChange={(e) => {
              this.changeVal(e, 'fatherMiddleName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.fatherLastName}
            onChange={(e) => {
              this.changeVal(e, 'fatherLastName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.motherFirstName}
            onChange={(e) => {
              this.changeVal(e, 'motherFirstName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.motherMiddleName}
            onChange={(e) => {
              this.changeVal(e, 'motherMiddleName');
            }}
            type="text"
            className="form-control"
          />
        </td>
        <td>
          <input
            value={this.state.motherLastName}
            onChange={(e) => {
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

StudentInputRow.propTypes = {
  formErrors: PropTypes.array,
  languages: PropTypes.array,
  index: PropTypes.any,
  updateValue: PropTypes.func,
  student: PropTypes.object,
  institutionId: PropTypes.number,
};

export { StudentInputRow };