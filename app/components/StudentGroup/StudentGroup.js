import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router';

const StudentGroupView = (props) => {
  const { isLoading, district, block, cluster, institution, group } = props;

  if (isLoading || isEmpty(group)) {
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
        <li>
          <Link className="active">
            {group.name}
          </Link>
        </li>
      </ol>
    </div>
  );
};

StudentGroupView.propTypes = {
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  group: PropTypes.object,
};

export { StudentGroupView };
