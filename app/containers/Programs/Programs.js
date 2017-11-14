import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ProgramView } from '../../components/Programs';
import {
  fetchAllPrograms,
  openCreateProgramModal,
  openCreateAssessmentModal,
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
  };
};

const Programs = connect(mapStateToProps, {
  fetchAllPrograms,
  openCreateAssessmentModal,
  openCreateProgramModal,
  selectProgram,
})(GetPrograms);

export { Programs };
