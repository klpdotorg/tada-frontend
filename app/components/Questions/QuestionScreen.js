import React from 'react';
import PropTypes from 'prop-types';

import { ProgramDetails, QuestionList, CreateQuestion } from '../../containers/Questions';

const QuestionScreen = ({ params }) => {
  const { assessmentId, programId } = params;

  return (
    <div className="container-fluid">
      <h4 className="text-primary">Question Details</h4>
      <div className="base-spacing-sm border-base" />
      <div className="base-spacing-mid" />
      <ProgramDetails programId={programId} assessmentId={assessmentId} />
      <br />
      <div>
        <h4 className="text-primary text-center"> Questions in this assessment</h4>
      </div>
      <QuestionList />
      <CreateQuestion assessmentId={assessmentId} />
    </div>
  );
};

QuestionScreen.propTypes = {
  params: PropTypes.object,
};

export { QuestionScreen };
