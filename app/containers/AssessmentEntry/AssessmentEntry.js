import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { fetchAssessmentEntryResources } from '../../actions';
import { AnswersSheet } from '../../components/AssessmentEntry';

class FetchResources extends Component {
  componentDidMount() {
    this.props.fetchResources();
  }

  render() {
    return <AnswersSheet {...this.props} />;
  }
}

FetchResources.propTypes = {
  fetchResources: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { selectedProgramAssess, loading } = state.assessmentEntry;

  return {
    selectedProgram: Number(state.programs.selectedProgram),
    selectedProgramAssess: !isEmpty(selectedProgramAssess),
    loading,
  };
};

const AssessmentEntry = connect(mapStateToProps, {
  fetchResources: fetchAssessmentEntryResources,
})(FetchResources);

export { AssessmentEntry };
