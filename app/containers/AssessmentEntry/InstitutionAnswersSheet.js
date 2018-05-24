import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';

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

  componentWillReceiveProps(nextProps) {
    const { questionGroupId } = this.props.params;
    const nextId = get(nextProps, ['institution', 'id'], '');
    const currentId = get(this.props, ['institution', 'id'], '');
    if (nextId !== currentId) {
      if (!isEmpty(nextProps.institution)) {
        this.props.fetchAnswerGroups(questionGroupId, 'institution_id', nextId);
      }
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
  const { answergroups, fetching } = state.answergroups;
  const answereFetching = state.answers.fetching;
  const institution = get(state.programDetails.programDetails, institutionId, {});

  return {
    rows: Object.keys(answergroups),
    institution,
    loading: answersLoading || fetching || answereFetching,
    uniqueId: institutionId,
  };
};

const InstitutionAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
  fetchAnswerGroups,
  fetchSelectedAssessmentQuestions,
})(FetchAnswersAndQuestions);

export { InstitutionAnswersSheet };
