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
  selectProgram,
} from '../../actions';
import { checkAssessmentPermissions } from '../../utils';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    const { boundary, boundaryInfo } = this.props;
    const { assessmentId, boundaryType, boundaryId } = boundaryInfo;
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
    this.props.fetchQuestions(assessmentId, entities, programId);
    if (!isEmpty(boundary)) {
      this.props.fetchAnswerGroups(assessmentId, boundaryType, boundaryId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { assessmentId, boundaryType, boundaryId } = nextProps.boundaryInfo;
    const nextId = get(nextProps, ['boundary', 'id'], '');
    const currentId = get(this.props, ['boundary', 'id'], '');
    if (nextId !== currentId) {
      if (!isEmpty(nextProps.boundary)) {
        this.props.fetchAnswerGroups(assessmentId, boundaryType, boundaryId);
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
  fetchAnswerGroups: PropTypes.func,
  fetchQuestions: PropTypes.func,
  fetchBoundaries: PropTypes.func,
  fetchAnswers: PropTypes.func,
  selectProgram: PropTypes.func,
  boundaryInfo: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { studentGroupId, questionGroupId } = ownProps.params;
  const { answersLoading } = state.assessmentEntry;
  const { answergroups, fetching } = state.answergroups;
  const answerFetching = state.answers.fetching;
  const studentGroup = get(state.programDetails.programDetails, studentGroupId, {});
  const { loadingBoundary } = state.appstate;
  const { isAdmin } = state.profile;
  const { assessments } = state.userPermissions;
  const canView = checkAssessmentPermissions(isAdmin, assessments, questionGroupId);

  return {
    boundary: studentGroup,
    rows: Object.keys(get(answergroups, studentGroup.id, {})),
    loading: answersLoading || fetching || answerFetching || loadingBoundary,
    uniqueId: studentGroupId,
    boundaryInfo: {
      boundaryId: studentGroup.id,
      assessmentId: questionGroupId,
      boundaryType: 'studentgroup',
    },
    canView,
  };
};

const StudentGroupAnswersSheet = connect(mapStateToProps, {
  selectProgram,
  fetchAnswers,
  fetchAnswerGroups,
  fetchQuestions: fetchSelectedAssessmentQuestions,
})(FetchAnswersAndQuestions);

export { StudentGroupAnswersSheet };
