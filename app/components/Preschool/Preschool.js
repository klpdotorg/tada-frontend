import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import { PermissionView, PreschoolActions } from './index';
import { EditPreschool } from '../../containers/Preschool';
import { CreateClass } from '../../containers/StudentGroup';
import { Loading } from '../common';

const PreschoolView = (props) => {
  const { isLoading, district, project, circle, institution, params, hasPermissions } = props;

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
          <Link to={project.path}> {project.name}</Link>
        </li>
        <li>
          {' '}
          <Link to={circle.path}> {circle.name}</Link>
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
  isAdmin: PropTypes.bool,
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
