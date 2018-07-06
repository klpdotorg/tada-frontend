import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { DEFAULT_PROGRAM_NODE_ID } from 'config';

import { AssessmentEntryFormView } from '../../components/StudentAssessmentEntry';
import {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
  fetchStudentsForAssessmentEntry,
} from '../../actions';
import { checkAssessmentPermissions } from '../../utils';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    const { boundary, boundaryInfo } = this.props;
    const { assessmentId } = boundaryInfo;
    const { districtId, blockId, clusterId, programId, institutionId } = this.props.params;
    const entities = [
      DEFAULT_PROGRAM_NODE_ID,
      districtId,
      blockId,
      clusterId,
      institutionId,
    ].map((id, index) => {
      return {
        uniqueId: id,
        depth: index,
      };
    });
    this.props.fetchSelectedAssessmentQuestions(assessmentId, entities, programId);
    if (!isEmpty(boundary)) {
      this.props.fetchStudentsForAssessmentEntry(boundaryInfo);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, ['boundary', 'id'], '');
    const currentId = get(this.props, ['boundary', 'id'], '');
    if (nextId !== currentId) {
      if (!isEmpty(nextProps.boundary)) {
        this.props.fetchStudentsForAssessmentEntry(nextProps.boundaryInfo);
      }
    }
  }

  render() {
    return <AssessmentEntryFormView {...this.props} />;
  }
}

FetchAnswersAndQuestions.propTypes = {
  params: PropTypes.object,
  boundary: PropTypes.object,
  boundaryInfo: PropTypes.object,
  fetchSelectedAssessmentQuestions: PropTypes.func,
  fetchAnswerGroups: PropTypes.func,
  fetchStudentsForAssessmentEntry: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { studentGroupId, questionGroupId } = ownProps.params;
  const { answersLoading, students } = state.assessmentEntry;
  const { answergroups, fetching } = state.answergroups;
  const answereFetching = state.answers.fetching;
  const studentgroup = get(state.programDetails.programDetails, studentGroupId, {});
  const { loadingBoundary } = state.appstate;
  const rows = students.reduce((soFar, student) => {
    const result = soFar;
    const values = get(answergroups, [student.id], {});
    result[student.id] = values;
    return result;
  }, {});
  const { isAdmin } = state.profile;
  const { assessments } = state.userPermissions;
  const canView = checkAssessmentPermissions(isAdmin, assessments, questionGroupId);
  const { error } = state.answers;

  return {
    rows,
    boundary: studentgroup,
    loading: answersLoading || fetching || answereFetching || loadingBoundary,
    uniqueId: studentGroupId,
    boundaryInfo: {
      students: state.assessmentEntry.students.map((value) => {
        return value.id;
      }),
      boundaryId: studentgroup.id,
      assessmentId: questionGroupId,
      boundaryType: 'student',
    },
    noQuestions: isEmpty(state.questions.questions),
    canView,
    error,
  };
};

const StudentsAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
  fetchStudentsForAssessmentEntry,
})(FetchAnswersAndQuestions);

export { StudentsAnswersSheet };
