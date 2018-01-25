import React from 'react';

import {
  ShowPrograms,
  ShowAssessmentTypes,
  ShowAssessments,
  ShowClasses,
  ShowInstitutions,
  ShowClusters,
} from '../../containers/MapAssessments';

const MapAssessmentsView = () => {
  return (
    <div className="row">
      {/* <div className="col-md-9">
              <div className="row">
                {boundaryCategory == 10 || (!primarySelected && boundaryCategory == 14)
                  ? <div className="col-md-6">
                      <ShowClusters />
                    </div>
                  : <div />}
                {boundaryCategory == 11 || showClusterInstitutions
                  ? <div className="col-md-6">
                      <ShowInstitutions />
                    </div>
                  : <div />}
              </div>
            </div> */}
      <div className="col-md-3">
        <ShowPrograms />
        <ShowAssessmentTypes />
        <ShowAssessments />
        <ShowClasses />
        <div className="row center-block">
          <div className="col-md-12">
            <button type="button" className="btn btn-primary">
              Map to Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MapAssessmentsView };
