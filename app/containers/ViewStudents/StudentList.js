import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { StudentListView } from '../../components/ViewStudents';
import { fetchCenters, resetSelectedStudents } from '../../actions';

class FetchResources extends Component {
  componentDidMount() {
    this.props.fetchCenters(this.props.institutionId);
    this.props.resetSelectedStudents();
  }

  render() {
    return <StudentListView {...this.props} />;
  }
}

FetchResources.propTypes = {
  fetchCenters: PropTypes.func,
  resetSelectedStudents: PropTypes.func,
  institutionId: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    studentIds: get(state.boundaries.boundariesByParentId, '5', []),
    loading: state.appstate.loadingBoundary,
  };
};

const StudentList = connect(mapStateToProps, {
  fetchCenters,
  resetSelectedStudents,
})(FetchResources);

export { StudentList };
