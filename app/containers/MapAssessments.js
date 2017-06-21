import { connect } from 'react-redux';
import MapAssessments from '../components/MapAssessments';

const mapStateToProps = (state, ownProps) => {
  return {
    programs: state.programs.programsById,
    programId: state.mapAssessments.selected.programId,
    primarySelected: state.schoolSelection.primarySchool,
    assessmentTypeId: state.mapAssessments.selected.assessmentTypeId,
    assessments: state.assessments.assessmentsById,
    fetchingAssessments: state.assessments.isFetching,
    clusters: getBoundaryDetails(
      state.mapAssessments.boundaries.boundaryDetails,
      state.mapAssessments.clusterIds,
    ),
    institutions: getBoundaryDetails(
      state.mapAssessments.boundaries.boundaryDetails,
      state.mapAssessments.institutionIds,
    ),
    boundaryCategory: state.mapAssessments.selected.boundaryCategory,
    selectedClusters: state.mapAssessments.selected.clusters,
    selectedInstitutions: state.mapAssessments.selected.institutions,
    showClusterInstitutions: state.mapAssessments.showClusterInstitutions,
    fetchingInstitutions: state.mapAssessments.fetchingInstitutions,
    fetchingClusters: state.mapAssessments.fetchingClusters,
    selectAllClusters: state.mapAssessments.selectAllClusters,
    selectAllInstitutions: state.mapAssessments.selectAllInstitutions,
  };
};

const getBoundaryDetails = (boundaryDetails, ids) => {
  return ids.map(id => {
    return boundaryDetails[id];
  });
};

const MapAssessmentsContainer = connect(mapStateToProps)(MapAssessments);

export default MapAssessmentsContainer;
