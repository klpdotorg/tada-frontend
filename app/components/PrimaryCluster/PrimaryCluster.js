import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { Loading } from '../common';
import { CheckPermissions } from './index';
import { CreateInstitution } from '../../containers/Institution';

const PrimaryClusterView = ({ isLoading, district, block, cluster, params }) => {
  if (isLoading || !Object.keys(cluster).length) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={district.path}>
            {district.name}
          </Link>
        </li>
        <li>
          <Link to={block.path}>
            {block.name}
          </Link>
        </li>
        <li className="active">
          {cluster.name}
        </li>
      </ol>
      <CheckPermissions
        clusterNodeId={params.clusterNodeId}
        blockNodeId={params.blockNodeId}
        blockId={block.id}
      />
      <CreateInstitution
        parent={cluster.id}
        clusterNodeId={params.clusterNodeId}
      />
    </div>
  );
};

PrimaryClusterView.propTypes = {
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  params: PropTypes.object,
};

export { PrimaryClusterView };
