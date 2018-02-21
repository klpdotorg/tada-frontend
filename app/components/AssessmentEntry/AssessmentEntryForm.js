import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';
import { AssessmentEntryColHeader, AssessmentEntryRow } from '../../containers/AssessmentEntry';

const AssessmentEntryFormView = ({ isFetching, boundaries }) => {
  return (
    <table className="table table-striped">
      <thead>
        <AssessmentEntryColHeader />
      </thead>
      <tbody>
        {isFetching ? (
          <tr colSpan="3">
            <td colSpan="3" style={{ 'text-align': 'center' }}>
              <Loading />
            </td>
          </tr>
        ) : (
          boundaries.map((id) => {
            return <AssessmentEntryRow id={id} key={id} />;
          })
        )}
      </tbody>
    </table>
  );
};

AssessmentEntryFormView.propTypes = {
  isFetching: PropTypes.bool,
  boundaries: PropTypes.array,
};

export { AssessmentEntryFormView };
