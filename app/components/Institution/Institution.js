import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash.isempty';

import { PermissionMessages, InstitutionActions } from './index';
import { Spinner } from '../../containers/common';
import { EditInstitution } from '../../containers/Institution';
import { CreateClass } from '../../containers/StudentGroup';
import { Loading } from '../common';

const InstitutionView = (props) => {
  const { isLoading, district, block, cluster, institution, params, paths, hasPermissions } = props;

  if (isLoading || isEmpty(institution)) {
    return <Loading />;
  }

  return (
    <div>
      <Spinner />
      <ol className="breadcrumb">
        <li>
          <Link to={paths[0]}>{district.name}</Link>
        </li>
        <li>
          {' '}
          <Link to={paths[1]}> {block.name}</Link>
        </li>
        <li>
          {' '}
          <Link to={paths[2]}> {cluster.name}</Link>
        </li>
        <li className="active"> {institution.name}</li>
      </ol>
      <div>
        <PermissionMessages hasPermissions={hasPermissions} />
        <InstitutionActions
          hasPermissions={hasPermissions}
          toggleClassModal={props.toggleClassModal}
          showTeachers={() => {
            props.showTeachers(params.institutionNodeId, props.depth);
          }}
        />
        <div className="border-base" />
        <div className="base-spacing-sm" />
        <EditInstitution
          clusterId={cluster.id}
          clusterNodeId={params.clusterNodeId}
          institutionNodeId={params.institutionNodeId}
          hasPermissions={hasPermissions}
        />
        <CreateClass institutionId={institution.id} institutionNodeId={params.institutionNodeId} />
      </div>
    </div>
  );
};

InstitutionView.propTypes = {
  hasPermissions: PropTypes.bool,
  paths: PropTypes.array,
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  showTeachers: PropTypes.func,
  params: PropTypes.object,
  toggleClassModal: PropTypes.func,
  depth: PropTypes.number,
};

export { InstitutionView };
