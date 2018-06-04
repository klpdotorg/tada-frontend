import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';
import {
  AssessmentEntryColHeader,
  AssessmentEntryRow,
  CreateEntryForm,
} from '../../containers/AssessmentEntry';

const RenderForm = (props) => {
  const { loading, params, uniqueId, rows, boundaryInfo } = props;

  if (loading) {
    return <tbody />;
  }

  if (!rows.length) {
    return (
      <CreateEntryForm
        assessmentId={params.questionGroupId}
        uniqueId={uniqueId}
        boundaryInfo={boundaryInfo}
      />
    );
  }

  return (
    <tbody>
      {rows.map((rowId) => {
        return (
          <AssessmentEntryRow
            rowId={rowId}
            key={rowId}
            assessmentId={params.questionGroupId}
            uniqueId={uniqueId}
            boundaryInfo={boundaryInfo}
          />
        );
      })}
    </tbody>
  );
};

const AssessmentEntryFormView = (props) => {
  const { loading } = props;
  return (
    <div>
      <button
        onClick={() => {
          console.log('OnPress');
        }}
        className="btn btn-primary"
        style={{ float: 'right', marginBottom: 20 }}
      >
        Add Row
      </button>
      <div className="answer-table">
        <table className="table table-striped">
          <thead>
            <AssessmentEntryColHeader />
          </thead>
          <RenderForm {...props} />
        </table>
        {loading ? (
          <div style={{ textAlign: 'center', paddingBottom: 10 }}>
            <Loading />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

AssessmentEntryFormView.propTypes = {
  loading: PropTypes.bool,
};

RenderForm.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
  params: PropTypes.object,
  uniqueId: PropTypes.any,
  boundaryInfo: PropTypes.object,
};

export { AssessmentEntryFormView };
