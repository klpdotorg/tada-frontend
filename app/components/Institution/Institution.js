import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { PermissionMessages, InstitutionActions } from './index';
import { EditInstitution } from '../../containers/Institution';
import { Loading } from '../common';

const InstitutionView = props => {
  const { isLoading, district, block, cluster, institution } = props;

  if (isLoading) {
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
          {' '}<Link to={block.path}> {block.name}</Link>
        </li>
        <li>
          {' '}<Link to={cluster.path}> {cluster.name}</Link>
        </li>
        <li className="active">
          {' '}{institution.name}
        </li>
      </ol>
      <div>
        <PermissionMessages />
        <InstitutionActions />
        <div className="border-base" />
        <div className="base-spacing-sm" />
        <EditInstitution />
      </div>
    </div>
  );
};

InstitutionView.propTypes = {
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
};

export { InstitutionView };
