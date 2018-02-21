import React from 'react';
import PropTypes from 'prop-types';

import { Alert, DefaultMessage } from './index';
import { AssessmentEntryForm, ProgramDropdown } from '../../containers/AssessmentEntry';

const AnswersSheet = ({ showAlert, selectedProgramAssess }) => {
  return (
    <div>
      {showAlert ? <Alert /> : null}
      <ProgramDropdown />
      {selectedProgramAssess ? <AssessmentEntryForm /> : <DefaultMessage />}
    </div>
  );
};

AnswersSheet.propTypes = {
  showAlert: PropTypes.bool,
  selectedProgramAssess: PropTypes.bool,
};

export { AnswersSheet };
