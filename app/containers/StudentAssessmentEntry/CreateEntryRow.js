import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';
import Loadable from 'react-loadable';

import { filterRespondentTypes } from '../AssessmentEntry/utils';
import {
  onChangeAssessmentEntry,
  createAnswerGroup,
  fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeDateOfVisit,
  onChangeComments,
  infoNotification,
  onChangeRespondentType,
} from '../../actions';
import { Loading } from '../../components/common';

const CreateEntryRowView = Loadable({
  loader: () => {
    return import('../../components/AssessmentEntry/CreateEntryRow');
  },
  loading: Loading,
});

class GetResources extends Component {
  constructor() {
    super();

    this.state = {
      defaultValueSet: false,
    };
  }

  componentDidMount() {
    const { id, questions } = this.props;

    if (questions.length) {
      this.setDefaultValue([
        {
          id,
        },
      ]);
      this.setState({
        defaultValueSet: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id, questions } = nextProps;

    if (!this.state.defaultValueSet) {
      if (questions.length) {
        this.setDefaultValue([
          {
            id,
          },
        ]);
        this.setState({
          defaultValueSet: true,
        });
      }
    }
  }

  setDefaultValue() {
    const { boundaryId, defaultRespondentType } = this.props;

    this.props.onChangeDateOfVisit(boundaryId, new Date());
    this.props.onChangeGroupValue(boundaryId, '');
    this.props.onChangeComments(boundaryId, '');
    this.props.onChangeRespondentType(boundaryId, defaultRespondentType);
  }

  render() {
    return <CreateEntryRowView {...this.props} />;
  }
}

GetResources.propTypes = {
  boundaryId: PropTypes.number,
  questions: PropTypes.array,
  onChange: PropTypes.func,
  onChangeDateOfVisit: PropTypes.func,
  onChangeGroupValue: PropTypes.func,
  surveyType: PropTypes.string,
  fetchStudents: PropTypes.func,
  students: PropTypes.array,
  name: PropTypes.string,
  id: PropTypes.any,
  boundaryInfo: PropTypes.object,
  onChangeComments: PropTypes.func,
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
  const boundary = state.assessmentEntry.students.find((student) => {
    return ownProps.boundaryId === student.id;
  });
  const program = get(programs, selectedProgram, {});
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  const questionValues = Object.values(state.questions.questions);
  const questions = orderBy(questionValues, ['sequence'], ['asc']);

  const defaultRespondentType = get(assessment, 'default_respondent_type');

  return {
    questions,
    id: get(boundary, 'id', ''),
    name: `${get(boundary, 'first_name', '')} ${get(boundary, 'last_name', '')}`,
    answers,
    surveyType: program.survey_on,
    students,
    groupValue: get(groupValues, ownProps.boundaryId, ''),
    dateOfVisit: get(dateOfVisits, ownProps.boundaryId, new Date()),
    comment: get(comments, ownProps.boundaryId, ''),
    respondentTypeVal: get(respondentTypeVals, ownProps.boundaryId, defaultRespondentType),
    commentRequired: get(assessment, 'comments_required'),
    groupText: get(assessment, 'group_text'),
    respondentTypes: filterRespondentTypes(state.respondentTypes.types),
    respondentTypeRequired: get(assessment, 'respondenttype_required'),
    defaultRespondentType,
  };
};

const CreateEntryRow = connect(mapStateToProps, {
  onChange: onChangeAssessmentEntry,
  onSave: createAnswerGroup,
  fetchStudents: fetchStudentsForAssessmentEntry,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
  onChangeComments,
  onChangeRespondentType,
})(GetResources);

export { CreateEntryRow };
