import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import { PermissionMessages, InstitutionActions } from './index';
import { EditInstitution } from '../../containers/Institution';
import { CreateClass } from '../../containers/StudentGroup';
import { Loading } from '../common';

const InstitutionView = (props) => {
  const { isLoading, district, block, cluster, institution, params } = props;
  const canModify = !isEmpty(sessionStorage.getItem('isAdmin'));

  if (isLoading || isEmpty(institution)) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={district.path}>{district.name}</Link>
        </li>
        <li>
          {' '}
          <Link to={block.path}> {block.name}</Link>
        </li>
        <li>
          {' '}
          <Link to={cluster.path}> {cluster.name}</Link>
        </li>
        <li className="active"> {institution.name}</li>
      </ol>
      <div>
        <PermissionMessages canModify={canModify} />
        <InstitutionActions canModify={canModify} toggleClassModal={props.toggleClassModal} />
        <div className="border-base" />
        <div className="base-spacing-sm" />
        <EditInstitution
          clusterId={cluster.id}
          clusterNodeId={params.clusterNodeId}
          institutionNodeId={params.institutionNodeId}
        />
        <CreateClass institutionId={institution.id} institutionNodeId={params.institutionNodeId} />
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
  params: PropTypes.object,
  toggleClassModal: PropTypes.func,
};

export { InstitutionView };
