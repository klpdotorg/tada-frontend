import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { DEFAULT_PROGRAM_NODE_ID } from 'config';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
  fetchStudentsForAssessmentEntry,
} from '../../actions';

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
      // this.props.fetchAnswerGroups(assessmentId, boundaryType, boundaryId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextId = get(nextProps, ['boundary', 'id'], '');
    const currentId = get(this.props, ['boundary', 'id'], '');
    if (nextId !== currentId) {
      if (!isEmpty(nextProps.boundary)) {
        this.props.fetchStudentsForAssessmentEntry(nextProps.boundaryInfo);
        // this.props.fetchAnswerGroups(assessmentId, boundaryType, boundaryId);
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
  const { answersLoading } = state.assessmentEntry;
  const { answergroups, fetching } = state.answergroups;
  const answereFetching = state.answers.fetching;
  const studentgroup = get(state.programDetails.programDetails, studentGroupId, {});
  const { loadingBoundary } = state.appstate;

  return {
    rows: Object.keys(answergroups),
    boundary: studentgroup,
    loading: answersLoading || fetching || answereFetching || loadingBoundary,
    uniqueId: studentGroupId,
    boundaryInfo: {
      students: state.assessmentEntry.students.map((value, key) => {
        return key;
      }),
      boundaryId: studentgroup.id,
      assessmentId: questionGroupId,
      boundaryType: 'studentgroup',
    },
  };
};

const StudentsAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
  fetchStudentsForAssessmentEntry,
})(FetchAnswersAndQuestions);

export { StudentsAnswersSheet };
