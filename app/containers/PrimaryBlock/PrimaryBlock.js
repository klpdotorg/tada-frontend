import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { PrimaryBlockView } from '../../components/PrimaryBlock';
import { getBoundariesEntities } from '../../actions';
import { get } from '../../actions/requests';

class FetchBlockEntity extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { params, block } = this.props;
    const { districtNodeId, blockNodeId } = params;

    if (isEmpty(block)) {
      const entities = [DEFAULT_PARENT_NODE_ID, districtNodeId, blockNodeId].map((id, i) => {
        return { depth: i, uniqueId: id };
      });

      this.props.getBoundariesEntities(entities);
    }
  }

  render() {
    return <PrimaryBlockView {...this.props} />;
  }
}

FetchBlockEntity.propTypes = {
  params: PropTypes.object,
  block: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId, districtNodeId } = ownProps.params;
  const { isAdmin } = state.profile;
  console.log(ownProps);
  const pathname = get(ownProps, ['location', 'pathname'], '');
  return {
    block: state.boundaries.boundaryDetails[blockNodeId] || {},
    district: state.boundaries.boundaryDetails[districtNodeId] || {},
    // districtPath:
    isLoading: state.appstate.loadingBoundary,
    isAdmin,
  };
};

const PrimaryBlock = connect(mapStateToProps, { getBoundariesEntities })(FetchBlockEntity);

export default PrimaryBlock;
