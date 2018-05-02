import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AssessmentEntryFormView } from '../../components/AssessmentEntry';
import { fetchAnswers } from '../../actions';

class FetchAnswersAndQuestions extends Component {
  componentDidMount() {
    this.props.fetchAnswers();
  }

  render() {
    return <AssessmentEntryFormView {...this.props} />;
  }
}

FetchAnswersAndQuestions.propTypes = {
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

const StudentsAnswersSheet = connect(mapStateToProps, {
  fetchAnswers,
})(FetchAnswersAndQuestions);

export { StudentsAnswersSheet };
