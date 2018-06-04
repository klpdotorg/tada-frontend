import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { DEFAULT_PROGRAM_NODE_ID } from 'config';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import { fetchAnswers, fetchAnswerGroups, fetchSelectedAssessmentQuestions } from '../../actions';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    const { institution, boundaryInfo } = this.props;
    const { assessmentId, boundaryType, boundaryId } = boundaryInfo;
    const { districtId, blockId, clusterId, programId } = this.props.params;
    const entities = [DEFAULT_PROGRAM_NODE_ID, districtId, blockId, clusterId].map((id, index) => {
      return {
        uniqueId: id,
        depth: index,
      };
    });
    this.props.fetchSelectedAssessmentQuestions(assessmentId, entities, programId);
    if (!isEmpty(institution)) {
      this.props.fetchAnswerGroups(assessmentId, boundaryType, boundaryId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { assessmentId, boundaryType, boundaryId } = nextProps.boundaryInfo;
    const nextId = get(nextProps, ['institution', 'id'], '');
    const currentId = get(this.props, ['institution', 'id'], '');
    if (nextId !== currentId) {
      if (!isEmpty(nextProps.institution)) {
        this.props.fetchAnswerGroups(assessmentId, boundaryType, boundaryId);
      }
    }
  }

  render() {
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
};

const mapStateToProps = (state, ownProps) => {
  const { institutionId, questionGroupId } = ownProps.params;

  const { answersLoading } = state.assessmentEntry;
  const { answergroups, fetching } = state.answergroups;
  const answereFetching = state.answers.fetching;
  const institution = get(state.programDetails.programDetails, institutionId, {});
  const { programs } = state.programs;
  const { loadingBoundary } = state.appstate;

  return {
    rows: Object.keys(answergroups),
    institution,
    loading: answersLoading || fetching || answereFetching || loadingBoundary,
    uniqueId: institutionId,
    programsLength: Object.keys(programs).length,
    boundaryInfo: {
      boundaryId: institution.id,
      assessmentId: questionGroupId,
      boundaryType: 'institution',
    },
  };
};

const InstitutionAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
})(FetchAnswersAndQuestions);

export { InstitutionAnswersSheet };
