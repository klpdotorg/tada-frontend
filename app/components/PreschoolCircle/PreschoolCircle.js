import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import { CreatePreschool } from '../../containers/Preschool';
import { EditCircle } from '../../containers/PreschoolCircle';
import { NoPermissionView } from './index';

const PreschoolCircleView = ({ isAdmin, isLoading, district, project, circle, params }) => {
  if (isLoading || isEmpty(circle)) {
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
        <li>
          <Link to={project.path}>{project.name}</Link>
        </li>
        <li className="active">{circle.name}</li>
      </ol>
      <EditCircle circleNodeId={params.circleNodeId} projectNodeId={params.projectNodeId} />
      <CreatePreschool parent={circle.id} parentNodeId={params.circleNodeId} />
    </div>
  );
};

PreschoolCircleView.propTypes = {
  isLoading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  district: PropTypes.object,
  project: PropTypes.object,
  circle: PropTypes.object,
  params: PropTypes.object,
};

export { PreschoolCircleView };
