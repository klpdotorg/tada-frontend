import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash.isempty';

import { PermissionView, PreschoolActions } from './index';
import { Spinner } from '../../containers/common';
import { EditPreschool } from '../../containers/Preschool';
import { CreateClass } from '../../containers/StudentGroup';
import { Loading } from '../common';

const PreschoolView = (props) => {
  const {
    isLoading,
    district,
    project,
    circle,
    institution,
    params,
    hasPermissions,
    paths,
  } = props;

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
          <Link to={paths[1]}> {project.name}</Link>
        </li>
        <li>
          {' '}
          <Link to={paths[2]}> {circle.name}</Link>
        </li>
        <li className="active"> {institution.name}</li>
      </ol>
      <div>
        <PermissionView institution={institution} hasPermissions={hasPermissions} />
        <PreschoolActions
          hasPermissions={hasPermissions}
          toggleClassModal={props.toggleClassModal}
          showTeachers={() => {
            props.showTeachers(params.institutionNodeId, props.depth);
          }}
        />
        <div className="border-base" />
        <div className="base-spacing-sm" />
        <EditPreschool
          circleNodeId={params.circleNodeId}
          institutionNodeId={params.institutionNodeId}
          hasPermissions={hasPermissions}
        />
      </div>
      <CreateClass institutionId={institution.id} institutionNodeId={params.institutionNodeId} />
    </div>
  );
};

PreschoolView.propTypes = {
  hasPermissions: PropTypes.bool,
  paths: PropTypes.array,
  depth: PropTypes.number,
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  project: PropTypes.object,
  circle: PropTypes.object,
  institution: PropTypes.object,
  params: PropTypes.object,
  showTeachers: PropTypes.func,
  toggleClassModal: PropTypes.func,
};

export { PreschoolView };
