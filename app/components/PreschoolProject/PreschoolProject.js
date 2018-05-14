import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import { CreateCircle } from '../../containers/PreschoolCircle';
import { EditProject } from '../../containers/PreschoolProject';
import { NoPermissionView } from './index';

const PreschoolProjectView = ({ isAdmin, isLoading, district, project, params }) => {
  if (isLoading || isEmpty(project)) {
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
          <Link to={district.path}>{district.name}</Link>
        </li>
        <li className="active">{project.name}</li>
      </ol>
      <EditProject projectNodeId={params.projectNodeId} districtNodeId={params.districtNodeId} />
      <CreateCircle parent={project.id} />
    </div>
  );
};

PreschoolProjectView.propTypes = {
  isAdmin: PropTypes.bool,
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  project: PropTypes.object,
  params: PropTypes.object,
};

export { PreschoolProjectView };
