import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';
import Loadable from 'react-loadable';

import {
  onChangeAssessmentEntry,
  createAnswerGroup,
  fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
  onChangeComments,
  onChangeRespondentType,
} from '../../actions';
import { filterRespondentTypes } from './utils';
import { Loading } from '../../components/common';

const CreateEntryFormView = Loadable({
  loader: () => {
    return import('../../components/AssessmentEntry/CreateEntryForm');
  },
  loading: Loading,
});

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
      this.props.onChangeRespondentType(row.id, this.props.defaultRespondentType);
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
  onChangeRespondentType: PropTypes.func,
  defaultRespondentType: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { programs, selectedProgram } = state.programs;
  const {
    students,
    answers,
    groupValues,
    dateOfVisits,
    comments,
    respondentTypeVals,
  } = state.assessmentEntry;
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const program = get(programs, selectedProgram, {});
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  const questionValues = Object.values(state.questions.questions);
  const questions = orderBy(questionValues, ['sequence'], ['asc']);
  const defaultRespondentType = get(assessment, 'default_respondent_type');

  return {
    questions,
    id: get(boundary, 'id', ''),
    name: get(boundary, 'name', ''),
    answers,
    surveyType: program.survey_on,
    students,
    groupValues,
    dateOfVisits,
    respondentTypeVals,
    comments,
    commentRequired: get(assessment, 'comments_required'),
    respondentTypeRequired: get(assessment, 'respondenttype_required'),
    groupText: get(assessment, 'group_text'),
    respondentTypes: filterRespondentTypes(state.respondentTypes.types),
    defaultRespondentType,
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
  onChangeRespondentType,
})(GetResources);

export { CreateEntryForm };
