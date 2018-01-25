import React from 'react';
import PropTypes from 'prop-types';

const ShowProgramsView = (props) => {
  const { programs, selectedProgram } = props;

  return (
    <div className="row center-block margin-bottom">
      <div className="col-md-12">
        <p className="text-default" htmlFor="selectProgram">
          Select Programme:{' '}
        </p>
        <select
          className="form-control"
          id="selectProgram"
          onChange={props.changeProgram}
          value={selectedProgram}
        >
          {programs.map((program) => {
            return (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

ShowProgramsView.propTypes = {
  programs: PropTypes.array,
  selectedProgram: PropTypes.number,
  changeProgram: PropTypes.func,
};

export { ShowProgramsView };
