import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { DEFAULT_PARENT_ID } from 'config';
import { PrimaryBlockView } from '../../components/PrimaryBlock';
import {
  getEntities,
} from '../../actions';

class FetchBlockEntity extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { params, block } = this.props;
    const { districtId, blockId } = params;

    if (isEmpty(block)) {
      this.props.fetchEntities(districtId, blockId);
    }
  }

  render() {
    return <PrimaryBlockView {...this.props} />;
  }
}

FetchBlockEntity.propTypes = {
  params: PropTypes.object,
  block: PropTypes.object,
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
    dispatch(getEntities([DEFAULT_PARENT_ID, districtId, blockId]));
  },
});

const PrimaryBlock = connect(mapStateToProps, mapDispatchToProps)(FetchBlockEntity);

export { PrimaryBlock };
