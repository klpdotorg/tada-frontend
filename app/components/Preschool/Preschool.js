import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import { PermissionView, PreschoolActions } from './index';
import { EditPreschool } from '../../containers/Preschool';
import { Loading } from '../common';

const PreschoolView = (props) => {
  const { isLoading, district, project, circle, institution, params } = props;
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
          <Link to={project.path}> {project.name}</Link>
        </li>
        <li>
          {' '}
          <Link to={circle.path}> {circle.name}</Link>
        </li>
        <li className="active"> {institution.name}</li>
      </ol>
      <div>
        <PermissionView institution={institution} canModify={canModify} />
        <PreschoolActions
          canModify={canModify}
          toggleClassModal={props.toggleClassModal}
          showTeachers={() => { return props.showTeachers(institution.path); }}
        />
        <div className="border-base" />
        <div className="base-spacing-sm" />
        <EditPreschool circleId={circle.id} institutionNodeId={params.institutionNodeId} />
      </div>
    </div>
  );
};

PreschoolView.propTypes = {
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
