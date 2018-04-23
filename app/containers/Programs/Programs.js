import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProgramView } from '../../components/Programs';
import {
  getPrograms,
  openCreateProgramModal,
  openAddAssessmentModal,
  selectProgram,
} from '../../actions';

class GetPrograms extends Component {
  componentDidMount() {
    // Fetching all programs
    this.props.getPrograms();
  }

  render() {
    return <ProgramView {...this.props} />;
  }
}

GetPrograms.propTypes = {
  getPrograms: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    programs: state.programs.programs,
    selectedProgram: Number(state.programs.selectedProgram),
    loading: state.programs.loading,
  };
};

const Programs = connect(mapStateToProps, {
  getPrograms,
  openAddAssessmentModal,
  openCreateProgramModal,
  selectProgram,
})(GetPrograms);

export { Programs };
