import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash.isempty';

import { EditBlock } from '../../containers/PrimaryBlock';
import { CreateCluster } from '../../containers/PrimaryCluster';

const PrimaryBlockView = ({ paths, isLoading, district, block, params }) => {
  if (isLoading || isEmpty(block)) {
    return (
      <div>
        <i className="fa fa-cog fa-spin fa-lg fa-fw" />
        <span className="text-muted">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={paths[0]}>{district.name}</Link>
        </li>
        <li className="active">{block.name}</li>
      </ol>
      <EditBlock
        blockNodeId={params.blockNodeId}
        districtNodeId={params.districtNodeId}
        districtId={district.id}
      />
      <CreateCluster parent={block.id} parentNodeId={params.blockNodeId} />
    </div>
  );
};

PrimaryBlockView.propTypes = {
  isLoading: PropTypes.bool,
  paths: PropTypes.array,
  district: PropTypes.object,
  block: PropTypes.object,
  params: PropTypes.object,
};

export { PrimaryBlockView };
