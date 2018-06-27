import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash.isempty';

import { Spinner } from '../../containers/common';
import { CreateCircle } from '../../containers/PreschoolCircle';
import { EditProject } from '../../containers/PreschoolProject';

const PreschoolProjectView = ({ isLoading, district, project, params, paths }) => {
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
      <Spinner />
      <ol className="breadcrumb">
        <li>
          <Link to={paths[0]}>{district.name}</Link>
        </li>
        <li className="active">{project.name}</li>
      </ol>
      <EditProject projectNodeId={params.projectNodeId} districtNodeId={params.districtNodeId} />
      <CreateCircle parent={project.id} />
    </div>
  );
};

PreschoolProjectView.propTypes = {
  paths: PropTypes.array,
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  project: PropTypes.object,
  params: PropTypes.object,
};

export { PreschoolProjectView };
