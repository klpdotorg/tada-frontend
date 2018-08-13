import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { DEFAULT_PROGRAM_NODE_ID } from 'config';

import { AssessmentEntryFormView, DefaultMessageView } from '../../components/AssessmentEntry';
import {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
  getAssessments,
} from '../../actions';
import { checkAssessmentPermissions } from '../../utils';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    this.fetchResources(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const nextBoundaryId = get(nextProps, ['boundaryInfo', 'boundaryId'], '');
    const currentBoundaryId = get(this.props, ['boundaryInfo', 'boundaryId'], '');
    const nextAssessmentId = get(nextProps, ['boundaryInfo', 'assessmentId'], '');
    const currentAssessmentId = get(this.props, ['boundaryInfo', 'assessmentId'], '');

    if (nextBoundaryId !== currentBoundaryId || nextAssessmentId !== currentAssessmentId) {
      this.fetchResources(nextProps);
    }
  }

  fetchResources(props) {
    const { institution, boundaryInfo } = props;
    const { assessmentId, boundaryType, boundaryId } = boundaryInfo;
    const { districtId, blockId, clusterId, programId } = props.params;
    const entities = [DEFAULT_PROGRAM_NODE_ID, districtId, blockId, clusterId].map((id, index) => {
      return {
        uniqueId: id,
        depth: index,
      };
    });
    this.props.getAssessments(programId);
    this.props.fetchSelectedAssessmentQuestions(assessmentId, entities, programId);
    if (!isEmpty(institution)) {
      this.props.fetchAnswerGroups(assessmentId, boundaryType, boundaryId);
    }
  }

  render() {
    const { selectedProgram, params } = this.props;
    if (selectedProgram !== params.programId) {
      return <DefaultMessageView />;
    }

    return <AssessmentEntryFormView {...this.props} />;
  }
}

FetchAnswersAndQuestions.propTypes = {
  boundaryInfo: PropTypes.object,
  fetchBoundaries: PropTypes.func,
  fetchQuestions: PropTypes.func,
  fetchAnswers: PropTypes.func,
  params: PropTypes.object,
  fetchAnswerGroups: PropTypes.func,
  institution: PropTypes.object,
  fetchSelectedAssessmentQuestions: PropTypes.func,
  selectProgram: PropTypes.func,
  getAssessments: PropTypes.func,
  selectedProgram: PropTypes.string,
  selectAssessment: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { institutionId, questionGroupId } = ownProps.params;

  const { answersLoading } = state.assessmentEntry;
  const { answergroups, fetching } = state.answergroups;
  const answerFetching = state.answers.fetching;
  const institution = get(state.programDetails.programDetails, institutionId, {});
  const { programs } = state.programs;
  const { loadingBoundary } = state.appstate;
  const { isAdmin } = state.profile;
  const { assessments } = state.userPermissions;
  const canView = checkAssessmentPermissions(isAdmin, assessments, questionGroupId);
  const { error } = state.answers;
  const { selectedProgram } = state.programs;

  return {
    rows: Object.keys(get(answergroups, institution.id, {})),
    institution,
    loading: answersLoading || fetching || answerFetching || loadingBoundary,
    uniqueId: institutionId,
    programsLength: Object.keys(programs).length,
    boundaryInfo: {
      boundaryId: institution.id,
      assessmentId: questionGroupId,
      boundaryType: 'institution',
    },
    noQuestions: isEmpty(state.questions.questions),
    canView,
    error,
    selectedProgram: String(selectedProgram),
  };
};

const InstitutionAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
  getAssessments,
})(FetchAnswersAndQuestions);

export { InstitutionAnswersSheet };
