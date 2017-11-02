import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
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
    const { districtNodeId, blockNodeId } = params;

    if (isEmpty(block)) {
      this.props.getEntities([DEFAULT_PARENT_NODE_ID, districtNodeId, blockNodeId]);
    }
  }

  render() {
    return <PrimaryBlockView {...this.props} />;
  }
}

FetchBlockEntity.propTypes = {
  params: PropTypes.object,
  block: PropTypes.object,
  getEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId, districtNodeId } = ownProps.params;
  return {
    block: state.boundaries.boundaryDetails[blockNodeId] || {},
    district: state.boundaries.boundaryDetails[districtNodeId] || {},
    isLoading: state.appstate.loadingBoundary,
  };
};

const PrimaryBlock = connect(mapStateToProps, { getEntities })(FetchBlockEntity);

export { PrimaryBlock };
