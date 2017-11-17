import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProgramView } from '../../components/Programs';
import {
  fetchAllPrograms,
  openCreateProgramModal,
  openAddAssessmentModal,
  selectProgram,
} from '../../actions';

class GetPrograms extends Component {
  componentDidMount() {
    // Fetching all programs
    this.props.fetchAllPrograms();
  }

  render() {
    return <ProgramView {...this.props} />;
  }
}

GetPrograms.propTypes = {
  fetchAllPrograms: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    programs: state.programs.programs,
    selectedProgram: Number(state.programs.selectedProgram),
    loading: state.programs.loading,
  };
};

const Programs = connect(mapStateToProps, {
  fetchAllPrograms,
  openAddAssessmentModal,
  openCreateProgramModal,
  selectProgram,
})(GetPrograms);

export { Programs };
