import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import { fetchAnswers, fetchAnswerGroups, fetchSelectedAssessmentQuestions } from '../../actions';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    const { institution } = this.props;
    const { questionGroupId } = this.props.params;
    this.props.fetchSelectedAssessmentQuestions(questionGroupId);

    if (!isEmpty(institution)) {
      this.props.fetchAnswerGroups(questionGroupId, 'institution_id', institution.id);
    }
  }

  render() {
    return <AssessmentEntryFormView {...this.props} />;
  }
}

FetchAnswersAndQuestions.propTypes = {
  fetchBoundaries: PropTypes.func,
  fetchQuestions: PropTypes.func,
  fetchAnswers: PropTypes.func,
  params: PropTypes.object,
  fetchAnswerGroups: PropTypes.func,
  institution: PropTypes.object,
  fetchSelectedAssessmentQuestions: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { institutionId } = ownProps.params;

  const { answersLoading } = state.assessmentEntry;
  const { answergroups } = state.answergroups;
  const institution = get(state.programDetails.programDetails, institutionId, {});

  return {
    rows: Object.keys(answergroups),
    institution,
    loading: answersLoading,
    uniqueId: institutionId,
  };
};

const InstitutionAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
})(FetchAnswersAndQuestions);

export { InstitutionAnswersSheet };
