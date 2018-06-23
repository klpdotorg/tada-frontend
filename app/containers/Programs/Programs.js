import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import isEmpty from 'lodash.isempty';

import {
  getPrograms,
  toggleCreateProgramModal,
  toggleCreateAssessmentModal,
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
    if (isEmpty(this.props.programs)) {
      this.props.getPrograms();
    }
  }

  render() {
    return <ProgramView {...this.props} />;
  }
}

GetPrograms.propTypes = {
  getPrograms: PropTypes.func,
  programs: PropTypes.object,
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
  openAddAssessmentModal: toggleCreateAssessmentModal,
  openCreateProgramModal: toggleCreateProgramModal,
  selectProgram,
})(GetPrograms);

export { Programs };
