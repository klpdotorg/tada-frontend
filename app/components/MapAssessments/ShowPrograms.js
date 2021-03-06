import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';

const ShowProgramsView = (props) => {
  const { programs, selectedProgram, loading } = props;

  return (
    <div className="row center-block margin-bottom">
      <div className="col-md-12">
        <p className="text-default" htmlFor="selectProgram">
          Select Programme:{' '}
        </p>
        {loading ? (
          <Loading loadingText="Loading Program..." />
        ) : (
          <select
            className="form-control"
            id="selectProgram"
            onChange={(e) => {
              props.selectProgram(e.target.value);
            }}
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
        )}
      </div>
    </div>
  );
};

ShowProgramsView.propTypes = {
  loading: PropTypes.bool,
  programs: PropTypes.array,
  selectedProgram: PropTypes.number,
  selectProgram: PropTypes.func,
};

export default ShowProgramsView;
