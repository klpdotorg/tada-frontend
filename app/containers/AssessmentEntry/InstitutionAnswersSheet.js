import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import { fetchAnswers } from '../../actions';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    const { questionGroupId } = this.props.params;
    this.props.fetchAnswers(questionGroupId);
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
};

const mapStateToProps = (state, ownProps) => {
  const { institutionId } = ownProps.params;

  const { answersLoading } = state.assessmentEntry;

  return {
    boundaries: [institutionId],
    loading: answersLoading,
  };
};

const InstitutionAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
})(FetchAnswersAndQuestions);

export { InstitutionAnswersSheet };
