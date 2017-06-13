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
    let { programId, programs, primarySelected, dispatch } = this.props;

    return (
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-6">
              <ShowClusters />
            </div>
            <div className="col-md-6">
              <ShowInstitutions />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <ShowPrograms
            programs={programs}
            dispatch={dispatch}
            value={programId}
            primarySelected={primarySelected}
          />
          <ShowAssessmentTypes />
          <ShowAssessments />
          <ShowClasses />
        </div>
      </div>
    );
  }
}
