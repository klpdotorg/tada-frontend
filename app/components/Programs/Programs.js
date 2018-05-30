import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash.map';
import Loadable from 'react-loadable';

import { CreateAssessment } from '../../containers/Assessments';
import { Message, Loading } from '../common';
import { SelectedProgram, CreateProgram, EditProgram } from '../../containers/Programs';

const Assessments = Loadable({
  loader: () => {
    return import('../../containers/Assessments/Assessments');
  },
  loading: Loading,
});

const ProgramView = (props) => {
  const { selectedProgram, programs, loading } = props;

  if (loading) {
    return <Loading />;
  }

  if (!Object.keys(programs).length) {
    return <Message message="No Programs Found!" />;
  }

  return (
    <div>
      <div className="row center-block">
        <div className="col-md-8 form-inline">
          <h4 className="text-primary" htmlFor="sel1">
            Surveys:{' '}
          </h4>
          <select
            className="form-control"
            id="sel1"
            onChange={(e) => {
              props.selectProgram(e.target.value);
            }}
            value={selectedProgram}
          >
            {map(programs, (program) => {
              return (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className=" col-md-4">
          <button type="button" className="btn btn-primary" onClick={props.openCreateProgramModal}>
            Add Survey
          </button>
          <button
            type="button"
            className="btn btn-primary padded-btn"
            onClick={props.openAddAssessmentModal}
          >
            Add QuestionGroup
          </button>
        </div>
      </div>
      <SelectedProgram />
      <Assessments />
      <CreateProgram />
      <CreateAssessment />
      <EditProgram />
    </div>
  );
};

ProgramView.propTypes = {
  selectedProgram: PropTypes.number,
  programs: PropTypes.object,
  loading: PropTypes.bool,
  selectProgram: PropTypes.func,
  openCreateProgramModal: PropTypes.func,
  openAddAssessmentModal: PropTypes.func,
};

export default ProgramView;
