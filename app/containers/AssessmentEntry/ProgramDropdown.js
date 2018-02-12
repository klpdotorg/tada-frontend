import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';

import { selectProgram, fetchAllPrograms } from '../../actions';

class ProgramDropdownView extends Component {
  componentDidMount() {
    const { programs } = this.props;

    if (isEmpty(programs)) {
      this.props.fetchAllPrograms();
    }
  }

  render() {
    const { selectedProgram, programs } = this.props;

    return (
      <div className="row form-inline base-spacing">
        <h5 className="text-primary col-md-1" htmlFor="sel1">
          Programs:{' '}
        </h5>
        <select
          className="form-control col-md-11"
          id="sel1"
          onChange={(e) => {
            this.props.selectProgram(e.target.value);
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
    );
  }
}

ProgramDropdownView.propTypes = {
  selectedProgram: PropTypes.string,
  programs: PropTypes.object,
  selectProgram: PropTypes.func,
  fetchAllPrograms: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    programs: state.programs.programs,
    selectedProgram: String(state.programs.selectedProgram),
  };
};

const ProgramDropdown = connect(mapStateToProps, {
  selectProgram,
  fetchAllPrograms,
})(ProgramDropdownView);

export { ProgramDropdown };
