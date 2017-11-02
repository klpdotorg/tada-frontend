import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import { PermissionView, PreschoolActions } from './index';
import { EditPreschool } from '../../containers/Preschool';
import { Loading } from '../common';

const PreschoolView = props => {
  const { isLoading, district, project, circle, institution, params } = props;
  console.log(isLoading)
  if (isLoading || isEmpty(institution)) {
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
          {' '}<Link to={project.path}> {project.name}</Link>
        </li>
        <li>
          {' '}<Link to={circle.path}> {circle.name}</Link>
        </li>
        <li className="active">
          {' '}{institution.name}
        </li>
      </ol>
      <div>
        {sessionStorage.getItem('isAdmin') ?
          <div className="row">
            <PreschoolActions
              toggleClassModal={props.toggleClassModal}
              showTeachers={() => props.showTeachers(institution.path)}
            />
            <div className="base-spacing-mid border-base" />
            <EditPreschool
              circleId={circle.id}
              institutionNodeId={params.institutionNodeId}
            />
          </div>
          :
          <PermissionView
            institution={institution}
          />
        }
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
