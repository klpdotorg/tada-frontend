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
  onChangeDateOfVisit,
  infoNotification,
} from '../../actions';

class GetResources extends Component {
  constructor() {
    super();

    this.state = {
      defaultValueSet: false,
    };
    this.getRows = this.getRows.bind(this);
  }

  componentDidMount() {
    const rows = this.getRows();
    const { surveyType, questions, boundaryInfo } = this.props;
    if (surveyType === 'student') {
      this.props.fetchStudents(boundaryInfo.boundaryId);
    }

    if (rows.length && Object.values(questions).length) {
      this.setDefaultValue(rows);
      this.setState({
        defaultValueSet: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const rows = this.getRows();
    const { questions } = nextProps;

    if (!this.state.defaultValueSet) {
      if (rows.length && Object.values(questions).length) {
        this.setDefaultValue(rows);
        this.setState({
          defaultValueSet: true,
        });
      }
    }
  }

  setDefaultValue(rows) {
    const { questions } = this.props;
    const values = Object.values(questions);
    rows.forEach((row) => {
      values.forEach((question) => {
        const questionType = get(question, 'question_type');
        const options = get(question, 'options', []);
        if (questionType === 'CheckBox' || questionType === 'Radio') {
          // this.props.onChange(options[0], row.id, question.id);
        }
      });
      this.props.onChangeDateOfVisit(row.id, new Date().toISOString());
    });
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
  questions: PropTypes.object,
  onChange: PropTypes.func,
  onChangeDateOfVisit: PropTypes.func,
  surveyType: PropTypes.string,
  fetchStudents: PropTypes.func,
  students: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.any,
  boundaryInfo: PropTypes.object,
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
  onChangeDateOfVisit,
  infoNotification,
})(GetResources);

export { CreateEntryForm };
