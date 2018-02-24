import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import {
  fetchSelectedAssessmentBoundary,
  fetchSelectedAssessmentQuestions,
  fetchAnswers,
} from '../../actions';

class GetSelectAssessmentBoundaries extends Component {
  componentDidMount() {
    this.props.fetchBoundaries();
    this.props.fetchQuestions();
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
  const { boundaryIds } = state.assessmentEntry;
  return {
    boundaries: boundaryIds,
  };
};

const AssessmentEntryForm = connect(mapStateToProps, {
  fetchBoundaries: fetchSelectedAssessmentBoundary,
  fetchQuestions: fetchSelectedAssessmentQuestions,
  fetchAnswers,
})(GetSelectAssessmentBoundaries);

export { AssessmentEntryForm };
