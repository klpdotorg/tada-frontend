import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';
import { Alert } from './index';
import {
  AssessmentEntryColHeader,
  AssessmentEntryRow,
  ProgramDropdown,
} from '../../containers/AssessmentEntry';

const AnswersSheet = ({ showAlert, isFetching, studentIds }) => {
  return (
    <div>
      {showAlert ? <Alert /> : null}
      <ProgramDropdown />
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
            studentIds.map((id) => {
              return <AssessmentEntryRow id={id} key={id} />;
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

AnswersSheet.propTypes = {
  showAlert: PropTypes.bool,
  isFetching: PropTypes.bool,
  studentIds: PropTypes.array,
};

export { AnswersSheet };
