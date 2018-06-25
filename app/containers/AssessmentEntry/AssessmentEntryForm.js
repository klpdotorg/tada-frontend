import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import { fetchAnswers } from '../../actions';
import { checkAssessmentPermissions } from '../../utils';

class GetSelectAssessmentBoundaries extends Component {
  componentDidMount() {
    this.props.fetchAnswers();
  }

  render() {
    return <AssessmentEntryFormView {...this.props} />;
  }
}

GetSelectAssessmentBoundaries.propTypes = {
  fetchBoundaries: PropTypes.func,
  fetchQuestions: PropTypes.func,
  fetchAnswers: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { boundaryIds, answersLoading } = state.assessmentEntry;

  return {
    boundaries: boundaryIds,
    loading: answersLoading,
    noQuestions: isEmpty(state.questions.questions),
  };
};

const AssessmentEntryForm = connect(mapStateToProps, {
  fetchAnswers,
})(GetSelectAssessmentBoundaries);

export { AssessmentEntryForm };
