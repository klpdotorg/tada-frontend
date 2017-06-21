import React from 'react';
import _ from 'lodash';

import ShowPrograms from './map-assessments/ShowPrograms';
import ShowAssessmentTypes from './map-assessments/ShowAssessmentTypes';
import ShowAssessments from './map-assessments/ShowAssessments';
import ShowClasses from './map-assessments/ShowClasses';
import ShowInstitutions from './map-assessments/ShowInstitutions';
import ShowClusters from './map-assessments/ShowClusters';

export default class MapAssessments extends React.Component {
  render() {
    let {
      programId,
      programs,
      primarySelected,
      assessmentTypeId,
      assessments,
      fetchingAssessments,
      clusters,
      institutions,
      boundaryCategory,
      selectedInstitutions,
      selectedClusters,
      showClusterInstitutions,
      fetchingClusters,
      fetchingInstitutions,
      selectAllClusters,
      selectAllInstitutions,
      dispatch,
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            {boundaryCategory == 10 || (!primarySelected && boundaryCategory == 14)
              ? <div className="col-md-6">
                  <ShowClusters
                    clusters={clusters}
                    selectedClusters={selectedClusters}
                    dispatch={dispatch}
                    fetchingClusters={fetchingClusters}
                    selectAllClusters={selectAllClusters}
                  />
                </div>
              : <div />}
            {boundaryCategory == 11 || showClusterInstitutions
              ? <div className="col-md-6">
                  <ShowInstitutions
                    institutions={institutions}
                    selectedInstitutions={selectedInstitutions}
                    fetchingInstitutions={fetchingInstitutions}
                    dispatch={dispatch}
                    selectAllInstitutions={selectAllInstitutions}
                  />
                </div>
              : <div />}
          </div>
        </div>
        <div className="col-md-3">
          <ShowPrograms
            programs={programs}
            dispatch={dispatch}
            value={programId}
            primarySelected={primarySelected}
          />
          <ShowAssessmentTypes value={assessmentTypeId} dispatch={dispatch} />
          <ShowAssessments
            dispatch={dispatch}
            programId={programId}
            assessments={assessments}
            fetchingAssessments={fetchingAssessments}
          />
          <ShowClasses />
          <div className="row center-block">
            <div className="col-md-12">
              <button type="button" className="btn btn-primary">Map to Assessment</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
