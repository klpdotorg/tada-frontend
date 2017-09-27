import React from 'react';
import * as action from '../../actions';
import _ from 'lodash';

const types = [
  { value: 1, label: 'Institution' },
  { value: 2, label: 'Class' },
  { value: 3, label: 'Student' },
];

export default class ShowAssessmentTypes extends React.Component {
  componentDidMount() {
    this.selectAssessmentType(_.get(types[0], 'value'));
  }

  selectAssessmentType(value) {
    this.props.dispatch(action.setAssessmentTypeInMA(value));
  }

  changeAssessment = e => {
    this.selectAssessmentType(e.target.value);
  };

  render() {
    const { value } = this.props;

    const assessmentTypeList = types.map((type, i) => {
      return (
        <option key={i} value={type.value}>
          {type.label}
        </option>
      );
    });

    return (
      <div className="row center-block margin-bottom">
        <div className="col-md-12">
          <p className="text-default" htmlFor="selectAssessmentType">
            Select Assessment Type{' '}
          </p>
          <select
            className="form-control"
            id="selectAssessmentType"
            onChange={this.changeAssessment}
            value={value}
          >
            {assessmentTypeList}
          </select>
        </div>
      </div>
    );
  }
}
