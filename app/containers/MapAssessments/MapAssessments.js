import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

// import { MapAssessmentsView } from '../../components/MapAssessments';
import { mapBoundariesToAssessments } from '../../actions';
import { Loading } from '../../components/common';

const MapAssessmentsView = Loadable({
  loader: () => {
    return import('../../components/MapAssessments/MapAssessments');
  },
  loading: Loading,
});

class ActiveSubmitButton extends Component {
  constructor() {
    super();

    this.activeSubmit = this.activeSubmit.bind(this);
  }

  activeSubmit() {
    const {
      assessmentType,
      selectedInstitutions,
      selectedClasses,
      selectedAssessments,
      institutionsIndex,
    } = this.props;

    if (!selectedAssessments) {
      return false;
    }

    if (assessmentType === 1 && selectedInstitutions) {
      return true;
    }

    if (assessmentType === 2 && selectedClasses) {
      return true;
    }

    if (institutionsIndex) {
      return true;
    }

    return false;
  }

  render() {
    return <MapAssessmentsView {...this.props} activeSubmit={this.activeSubmit} />;
  }
}

ActiveSubmitButton.propTypes = {
  assessmentType: PropTypes.number,
  selectedInstitutions: PropTypes.bool,
  selectedClasses: PropTypes.bool,
  selectedAssessments: PropTypes.bool,
  institutionsIndex: PropTypes.any,
};

const mapStateToProps = (state) => {
  const {
    institutionsIndex,
    clustersIndex,
    selectedAssessmentType,
    selectedClusters,
    selectedInstitutions,
    selectedClasses,
    selectedAssessments,
    error,
  } = state.mapAssessments;

  const showInstitutions = institutionsIndex > 0 || selectedClusters.length > 0;
  return {
    showClusters: clustersIndex > 0,
    selectedInstitutions: selectedInstitutions.length > 0,
    selectedClasses: selectedClasses.length > 0,
    selectedAssessments: selectedAssessments.length > 0,
    institutionsIndex,
    showInstitutions,
    assessmentType: Number(selectedAssessmentType),
    error,
  };
};

const MapAssessments = connect(mapStateToProps, {
  mapAssessments: mapBoundariesToAssessments,
})(ActiveSubmitButton);

export { MapAssessments };
