import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';

import { CreateEntryFormView } from '../../components/AssessmentEntry';
import {
  onChangeAssessmentEntry,
  createAnswerGroup,
  fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
  onChangeComments,
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

    if (rows.length && questions.length) {
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
      if (rows.length && questions.length) {
        this.setDefaultValue(rows);
        this.setState({
          defaultValueSet: true,
        });
      }
    }
  }

  setDefaultValue(rows) {
    rows.forEach((row) => {
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
  questions: PropTypes.array,
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
  const { students, answers, groupValues, dateOfVisits, comments } = state.assessmentEntry;
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const program = get(programs, selectedProgram, {});
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  const questionValues = Object.values(state.questions.questions);
  const questions = orderBy(questionValues, ['sequence'], ['asc']);

  return {
    questions,
    id: get(boundary, 'id', ''),
    name: get(boundary, 'name', ''),
    answers,
    surveyType: program.survey_on,
    students,
    groupValues,
    dateOfVisits,
    comments,
    commentRequired: get(assessment, 'comments_required'),
    groupText: get(assessment, 'group_text'),
  };
};

const CreateEntryForm = connect(mapStateToProps, {
  onChange: onChangeAssessmentEntry,
  onSave: createAnswerGroup,
  fetchStudents: fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
  onChangeComments,
})(GetResources);

export { CreateEntryForm };
