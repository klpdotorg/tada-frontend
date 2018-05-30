import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { CreateEntryFormView } from '../../components/AssessmentEntry';
import {
  onChangeAssessmentEntry,
  createAnswerGroup,
  fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
} from '../../actions';

class GetResources extends Component {
  constructor() {
    super();

    this.getRows = this.getRows.bind(this);
  }

  componentDidMount() {
    const { surveyType, id } = this.props;
    if (surveyType === 'student') {
      this.props.fetchStudents(id);
    }
  }

  getRows() {
    const { students, id, name } = this.props;
    if (this.props.surveyType === 'student') {
      return students.map((student) => {
        return {
          id: student.id,
          name: `${student.first_name} ${student.last_name}`,
        };
      });
    }

    return [
      {
        id,
        name,
      },
    ];
  }

  render() {
    const rows = this.getRows();
    return <CreateEntryFormView {...this.props} rows={rows} />;
  }
}

GetResources.propTypes = {
  surveyType: PropTypes.string,
  fetchStudents: PropTypes.func,
  students: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.any,
};

const mapStateToProps = (state, ownProps) => {
  const { programs, selectedProgram } = state.programs;
  const { students, answers, groupValues, dateOfVisits } = state.assessmentEntry;
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const program = get(programs, selectedProgram, {});

  return {
    questions: state.questions.questions,
    id: get(boundary, 'id', ''),
    name: get(boundary, 'name', ''),
    answers,
    surveyType: program.survey_on,
    students,
    groupValues,
    dateOfVisits,
  };
};

const CreateEntryForm = connect(mapStateToProps, {
  onChange: onChangeAssessmentEntry,
  onSave: createAnswerGroup,
  fetchStudents: fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
})(GetResources);

export { CreateEntryForm };
