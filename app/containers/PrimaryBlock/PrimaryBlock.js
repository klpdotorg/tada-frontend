import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';

import { PrimaryBlockView } from '../../components/PrimaryBlock';
import { getBoundariesEntities } from '../../actions';
import { getEntitiesPath } from '../../utils';

class FetchBlockEntity extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { params, block, parentId } = this.props;
    const { districtNodeId, blockNodeId } = params;

    if (isEmpty(block)) {
      const entities = [parentId, districtNodeId, blockNodeId].map((id, i) => {
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
  parentId: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId, districtNodeId } = ownProps.params;
  const { isAdmin } = state.profile;
  const pathname = get(ownProps, ['location', 'pathname'], '');
  const paths = getEntitiesPath(pathname, [districtNodeId]);
  return {
    block: state.boundaries.boundaryDetails[blockNodeId] || {},
    district: state.boundaries.boundaryDetails[districtNodeId] || {},
    isLoading: state.appstate.loadingBoundary,
    paths,
    isAdmin,
    parentId: state.profile.parentNodeId,
  };
};

const PrimaryBlock = connect(mapStateToProps, { getBoundariesEntities })(FetchBlockEntity);

export default PrimaryBlock;
