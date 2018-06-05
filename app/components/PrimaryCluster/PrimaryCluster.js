import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { Loading } from '../common';
import { CheckPermissions } from './index';
import { CreateInstitution } from '../../containers/Institution';

const PrimaryClusterView = ({ isAdmin, isLoading, district, block, cluster, params, paths }) => {
  if (isLoading || !Object.keys(cluster).length) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={paths[0]}>{district.name}</Link>
        </li>
        <li>
          <Link to={paths[1]}>{block.name}</Link>
        </li>
        <li className="active">{cluster.name}</li>
      </ol>
      <CheckPermissions
        clusterNodeId={params.clusterNodeId}
        blockNodeId={params.blockNodeId}
        blockId={block.id}
        isAdmin={isAdmin}
        cluster={cluster}
      />
      <CreateInstitution parent={cluster.id} clusterNodeId={params.clusterNodeId} />
    </div>
  );
};

PrimaryClusterView.propTypes = {
  isAdmin: PropTypes.bool,
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  params: PropTypes.object,
  paths: PropTypes.array,
};

export { PrimaryClusterView };
