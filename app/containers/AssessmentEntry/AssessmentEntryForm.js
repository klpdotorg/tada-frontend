import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import { fetchAnswers } from '../../actions';

class GetSelectAssessmentBoundaries extends Component {
  componentDidMount() {
    // this.props.fetchAnswerGroups();
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
  };
};

const AssessmentEntryForm = connect(mapStateToProps, {
  fetchAnswers,
})(GetSelectAssessmentBoundaries);

export { AssessmentEntryForm };
