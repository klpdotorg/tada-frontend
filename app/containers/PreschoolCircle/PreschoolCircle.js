import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { getBoundariesEntities } from '../../actions';
import { PreschoolCircleView } from '../../components/PreschoolCircle';

class FetchCircleEntity extends Component {
  componentWillMount() {
    const { params, circle } = this.props;
    const { districtNodeId, projectNodeId, circleNodeId } = params;

    if (isEmpty(circle)) {
      const entities = [
        DEFAULT_PARENT_NODE_ID,
        districtNodeId,
        projectNodeId,
        circleNodeId,
      ].map((id, i) => {
        return { depth: i, uniqueId: id };
      });

      this.props.getBoundariesEntities(entities);
    }
  }

  render() {
    return <PreschoolCircleView {...this.props} />;
  }
}

FetchCircleEntity.propTypes = {
  params: PropTypes.object,
  circle: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { projectNodeId, districtNodeId, circleNodeId } = ownProps.params;

  return {
    circle: get(state.boundaries.boundaryDetails, circleNodeId, {}),
    project: get(state.boundaries.boundaryDetails, projectNodeId, {}),
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    isLoading: state.appstate.loadingBoundary,
  };
};

const PreschoolCircle = connect(mapStateToProps, { getBoundariesEntities })(FetchCircleEntity);

export { PreschoolCircle };
