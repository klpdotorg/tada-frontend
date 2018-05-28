import React from 'react';
import PropTypes from 'prop-types';

import { Alert, DefaultMessage } from './index';
import { Loading } from '../common';
import { AssessmentEntryForm, ProgramDropdown } from '../../containers/AssessmentEntry';

const AnswersSheet = ({ showAlert, selectedProgramAssess, loading }) => {
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {showAlert ? <Alert /> : null}
      <ProgramDropdown />
      {selectedProgramAssess ? <AssessmentEntryForm /> : <DefaultMessage />}
    </div>
  );
};

AnswersSheet.propTypes = {
  loading: PropTypes.bool,
  showAlert: PropTypes.bool,
  selectedProgramAssess: PropTypes.bool,
};

export { AnswersSheet };
