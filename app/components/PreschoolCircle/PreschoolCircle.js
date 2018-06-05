import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import isEmpty from 'lodash.isempty';

import { CreatePreschool } from '../../containers/Preschool';
import { EditCircle } from '../../containers/PreschoolCircle';

const PreschoolCircleView = ({ paths, isLoading, district, project, circle, params }) => {
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
          <Link to={paths[0]}>{district.name}</Link>
        </li>
        <li>
          <Link to={paths[1]}>{project.name}</Link>
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
  paths: PropTypes.array,
  district: PropTypes.object,
  project: PropTypes.object,
  circle: PropTypes.object,
  params: PropTypes.object,
};

export { PreschoolCircleView };
