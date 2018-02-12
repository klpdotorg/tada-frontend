import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { ShowProgramsView } from '../../components/MapAssessments';
import { fetchAllPrograms, selectProgram } from '../../actions';

class GetAllPrograms extends Component {
  componentDidMount = () => {
    const { programs } = this.props;

    if (isEmpty(programs)) {
      this.props.fetchAllPrograms();
    }
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
  programs: PropTypes.array,
};

const ShowPrograms = connect(mapStateToProps, {
  selectProgram,
  fetchAllPrograms,
})(GetAllPrograms);

export { ShowPrograms };
