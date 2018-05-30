import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import {
  getPrograms,
  openCreateProgramModal,
  openAddAssessmentModal,
  selectProgram,
} from '../../actions';

import { Loading } from '../../components/common';

const ProgramView = Loadable({
  loader: () => {
    return import('../../components/Programs/Programs');
  },
  loading: Loading,
});

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
