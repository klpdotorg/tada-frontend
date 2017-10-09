import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { NoPermissionBlockView } from './index';
import { EditBlock } from '../../containers/PrimaryBlock';
import { CreateCluster } from '../../containers/PrimaryCluster';

const PrimaryBlockView = ({ isLoading, district, block }) => {
  if (isLoading) {
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
          <Link to={district.path}>
            {district.name}
          </Link>
        </li>
        <li className="active">
          {block.name}
        </li>
      </ol>
      {sessionStorage.getItem('isAdmin') ? <EditBlock /> : <NoPermissionBlockView />}
      <CreateCluster parent={block.id} />
    </div>
  );
};

PrimaryBlockView.propTypes = {
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
};

export { PrimaryBlockView };
