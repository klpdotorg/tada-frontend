import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { Loading } from '../common';
import { CheckPermissions } from './index';
import { CreateInstitution } from '../../containers/Institution';

const PrimaryClusterView = ({ isLoading, district, block, cluster }) => {
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
      <CheckPermissions clusterId={cluster.id} />
      <CreateInstitution clusterId={cluster.id} />
    </div>
  );
};

PrimaryClusterView.propTypes = {
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
};

export { PrimaryClusterView };
