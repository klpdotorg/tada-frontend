import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

import { DefaultMessage } from './index';
import {
  ShowPrograms,
  ShowAssessmentTypes,
  ShowAssessments,
  ShowClasses,
  ShowInstitutions,
  ShowClusters,
} from '../../containers/MapAssessments';

const MapAssessmentsView = (props) => {
  const { showClusters, showInstitutions, mapAssessments, assessmentType, error } = props;
  const disabled = !props.activeSubmit();

  return (
    <div className="row">
      {!isEmpty(error) ? (
        <div className="alert alert-danger" style={{ marginLeft: 10, marginRight: 10 }}>
          {Object.keys(error).map((key) => {
            const value = error[key];
            return (
              <p key={key}>
                <strong>{key}:</strong> {value[0]}
              </p>
            );
          })}
        </div>
      ) : (
        <span />
      )}
      <div className="col-md-9">
        <div className="row">
          {showClusters ? (
            <div className="col-md-5 mapAssessment-cluster-cont">
              <ShowClusters />
            </div>
          ) : (
            <div />
          )}
          {showInstitutions ? (
            <div className="col-md-7 mapAssessment-institution-cont">
              <ShowInstitutions />
            </div>
          ) : (
            <div />
          )}
          {!showClusters && !showInstitutions ? <DefaultMessage /> : <div />}
        </div>
      </div>
      <div className="col-md-3">
        <ShowPrograms />
        <ShowAssessmentTypes />
        <ShowAssessments />
        {assessmentType === 2 ? <ShowClasses /> : <span />}
        <div className="row center-block">
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={mapAssessments}
              disabled={disabled}
            >
              Map to Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MapAssessmentsView.propTypes = {
  showClusters: PropTypes.bool,
  showInstitutions: PropTypes.bool,
  mapAssessments: PropTypes.func,
  activeSubmit: PropTypes.func,
  assessmentType: PropTypes.number,
  error: PropTypes.object,
};

export default MapAssessmentsView;
