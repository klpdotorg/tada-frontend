import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { InstitutionView } from '../../components/Institution';
import {
  showBoundaryLoading,
  openNode,
  fetchEntitiesFromServer,
  getBoundaries,
  closeBoundaryLoading,
} from '../../actions';

class FetchInstitutionEntity extends Component {
  componentDidMount() {
    const { blockId, districtId, clusterId } = this.props.params;
    this.props.fetchEntities(districtId, blockId, clusterId);
  }

  render() {
    return <InstitutionView {...this.props} />;
  }
}

FetchInstitutionEntity.propTypes = {
  params: PropTypes.object,
  fetchEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockId, districtId, clusterId, institutionId } = ownProps.params;

  return {
    district: get(state.boundaries.boundaryDetails, districtId, {}),
    block: get(state.boundaries.boundaryDetails, blockId, {}),
    cluster: get(state.boundaries.boundaryDetails, clusterId, {}),
    institution: get(state.boundaries.boundaryDetails, institutionId, {}),
    isLoading: state.appstate.loadingBoundary,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleClassModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createClass',
    });
  },
  fetchEntities: (districtId, blockId, clusterId) => {
    dispatch(showBoundaryLoading());
    dispatch(openNode(districtId));
    dispatch(fetchEntitiesFromServer(districtId));
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(2),
    }).then(() => {
      dispatch({
        type: 'BOUNDARIES',
        payload: getBoundaries(districtId),
      }).then(() => {
        dispatch(openNode(blockId));
        dispatch(fetchEntitiesFromServer(blockId));
        dispatch({
          type: 'BOUNDARIES',
          payload: getBoundaries(blockId),
        }).then(() => {
          dispatch(openNode(clusterId));
          dispatch(fetchEntitiesFromServer(clusterId));
          dispatch(closeBoundaryLoading());
        });
      });
    });
  },
});

const Institution = connect(mapStateToProps, mapDispatchToProps)(FetchInstitutionEntity);

export { Institution };
