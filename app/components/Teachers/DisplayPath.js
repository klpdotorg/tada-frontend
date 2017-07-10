import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const DisplayPath = props => {
  const { boundaryDetails, params } = props;
  const district = boundaryDetails[params.districtId];
  const block = boundaryDetails[params.blockId] || boundaryDetails[params.projectId];
  const cluster = boundaryDetails[params.clusterId] || boundaryDetails[params.circleId];
  const institution = boundaryDetails[params.institutionId];

  return (
    <ol className="breadcrumb">
      <li>
        <Link to={district.path}>
          {district.name}
        </Link>
      </li>
      <li>
        <Link to={block.path}>
          {block.name}
        </Link>
      </li>
      <li>
        <Link to={cluster.path}>
          {cluster.name}
        </Link>
      </li>
      <li>
        <Link to={institution.path}>
          {institution.name}
        </Link>
      </li>
      <li>Teachers</li>
    </ol>
  );
};

DisplayPath.propTypes = {
  boundaryDetails: PropTypes.object,
  params: PropTypes.object,
};

export default DisplayPath;
