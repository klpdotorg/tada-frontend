import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PrimaryBlockView } from '../../components/PrimaryBlock';
import {
  showBoundaryLoading,
  openNode,
  fetchEntitiesFromServer,
  getBoundaries,
  closeBoundaryLoading,
} from '../../actions';

class FetchBlockEntity extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { districtId, blockId } = this.props.params;
    this.props.fetchEntities(districtId, blockId);
  }

  render() {
    return <PrimaryBlockView {...this.props} />;
  }
}

FetchBlockEntity.propTypes = {
  params: PropTypes.object,
  fetchEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockId, districtId } = ownProps.params;
  return {
    block: state.boundaries.boundaryDetails[blockId] || {},
    district: state.boundaries.boundaryDetails[districtId] || {},
    isLoading: state.appstate.loadingBoundary,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEntities: (districtId, blockId) => {
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
        dispatch(closeBoundaryLoading());
      });
    });
  },
});

const PrimaryBlock = connect(mapStateToProps, mapDispatchToProps)(FetchBlockEntity);

export { PrimaryBlock };
