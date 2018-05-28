import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { ShowProgramsView } from '../../components/MapAssessments';
import { getPrograms, selectProgram } from '../../actions';

class GetAllPrograms extends Component {
  componentDidMount = () => {
    const { programs } = this.props;

    if (isEmpty(programs)) {
      this.props.getPrograms();
    }
  };

  render() {
    return <ShowProgramsView {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { programs, selectedProgram, loading } = state.programs;

  return {
    programs: Object.values(programs),
    selectedProgram: Number(selectedProgram),
    loading,
  };
};

GetAllPrograms.propTypes = {
  getPrograms: PropTypes.func,
  programs: PropTypes.array,
};

const ShowPrograms = connect(mapStateToProps, {
  selectProgram,
  getPrograms,
})(GetAllPrograms);

export { ShowPrograms };
