import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';
import { AssessmentEntryColHeader, AssessmentEntryRow } from '../../containers/AssessmentEntry';

const AssessmentEntryFormView = ({ loading, rows, params, uniqueId }) => {
  return (
    <div className="answer-table">
      <table className="table table-striped">
        <thead>
          <AssessmentEntryColHeader />
        </thead>
        <tbody>
          {!loading &&
            rows.map((rowId) => {
              return (
                <AssessmentEntryRow
                  rowId={rowId}
                  key={rowId}
                  assessmentId={params.questionGroupId}
                  uniqueId={uniqueId}
                />
              );
            })}
        </tbody>
      </table>
      {loading ? (
        <div style={{ textAlign: 'center', paddingBottom: 10 }}>
          <Loading />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

AssessmentEntryFormView.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
  params: PropTypes.object,
  uniqueId: PropTypes.any,
};

export { AssessmentEntryFormView };
