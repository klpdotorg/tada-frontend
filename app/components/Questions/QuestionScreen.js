import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';
import {
  ProgramDetails,
  QuestionList,
  CreateQuestion,
  EditQuestion,
} from '../../containers/Questions';

const QuestionScreen = ({ params, loading }) => {
  const { assessmentId, programId } = params;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid">
      <h4 className="text-primary">Question Details</h4>
      <div className="base-spacing-sm border-base" />
      <div className="base-spacing-mid" />
      <ProgramDetails programId={programId} assessmentId={assessmentId} />
      <br />
      <div>
        <h4 className="text-primary text-center"> Questions in this Assessment</h4>
      </div>
      <QuestionList />
      <CreateQuestion assessmentId={Number(assessmentId)} programId={Number(programId)} />
      <EditQuestion assessmentId={Number(assessmentId)} programId={Number(programId)} />
    </div>
  );
};

QuestionScreen.propTypes = {
  params: PropTypes.object,
  loading: PropTypes.bool,
};

export { QuestionScreen };
