import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ShowProgramsView } from '../../components/MapAssessments';
import { fetchAllPrograms, selectProgram } from '../../actions';

class GetAllPrograms extends Component {
  componentDidMount = () => {
    this.props.fetchAllPrograms();
  };

  render() {
    return <ShowProgramsView {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    programs: Object.values(state.programs.programs),
    selectedProgram: Number(state.programs.selectedProgram),
  };
};

GetAllPrograms.propTypes = {
  fetchAllPrograms: PropTypes.func,
};

const ShowPrograms = connect(mapStateToProps, {
  selectProgram,
  fetchAllPrograms,
})(GetAllPrograms);

export { ShowPrograms };
