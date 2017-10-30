import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_ID } from 'config';
import { getEntities } from '../../actions';
import { PreschoolCircleView } from '../../components/PreschoolCircle';

class FetchCircleEntity extends Component {
  componentWillMount() {
    const { params, circle } = this.props;
    const { districtId, projectId, circleId } = params;

    if (isEmpty(circle)) {
      this.props.getEntities([DEFAULT_PARENT_ID, districtId, projectId, circleId]);
    }
  }

  render() {
    return <PreschoolCircleView {...this.props} />;
  }
}

FetchCircleEntity.propTypes = {
  params: PropTypes.object,
  circle: PropTypes.object,
  getEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { projectId, districtId, circleId } = ownProps.params;

  return {
    circle: get(state.boundaries.boundaryDetails, circleId, {}),
    project: get(state.boundaries.boundaryDetails, projectId, {}),
    district: get(state.boundaries.boundaryDetails, districtId, {}),
    isLoading: state.appstate.loadingBoundary,
  };
};

const PreschoolCircle = connect(mapStateToProps, { getEntities })(FetchCircleEntity);

export { PreschoolCircle };
