import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import { SelectedProgram, CreateProgram, EditProgram } from '../../containers/Programs';

const ProgramView = (props) => {
  const { selectedProgram, programs } = props;

  return (
    <div className="container">
      <div className="row center-block">
        <div className="col-md-8 form-inline">
          <h4 className="text-primary" htmlFor="sel1">
            Programs:{' '}
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
            Add Program
          </button>
          <button
            type="button"
            className="btn btn-primary padded-btn"
            onClick={props.openCreateAssessmentModal}
          >
            Add Assessments
          </button>
        </div>
      </div>
      <SelectedProgram />
      <CreateProgram />
      <EditProgram />
    </div>
  );
};

ProgramView.propTypes = {
  selectedProgram: PropTypes.string,
  programs: PropTypes.object,
  selectProgram: PropTypes.func,
  openCreateProgramModal: PropTypes.func,
  openCreateAssessmentModal: PropTypes.func,
};

export { ProgramView };
