import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';
import { AssessmentEntryColHeader, AssessmentEntryRow } from '../../containers/AssessmentEntry';

const AssessmentEntryFormView = ({ loading, boundaries, params }) => {
  return (
    <div className="answer-table">
      <table className="table table-striped">
        <thead>
          <AssessmentEntryColHeader />
        </thead>
        <tbody>
          {!loading &&
            boundaries.map((id) => {
              return <AssessmentEntryRow id={id} key={id} assessmentId={params.questionGroupId} />;
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
  boundaries: PropTypes.array,
  params: PropTypes.object,
};

export { AssessmentEntryFormView };
