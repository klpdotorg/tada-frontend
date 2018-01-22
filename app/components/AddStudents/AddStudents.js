import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { AddStudentsForm } from '../../containers/AddStudents';
import { Loading } from '../common';

const AddStudentsView = (props) => {
  const { district, block, cluster, institution, studentGroup, isLoading, params, depth } = props;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={district.path}>{district.name}</Link>
        </li>
        <li>
          <Link to={block.path}>{block.name}</Link>
        </li>
        <li>
          <Link to={cluster.path}>{cluster.name}</Link>
        </li>
        <li>
          <Link to={institution.path}>{institution.name}</Link>
        </li>
        <li>
          <Link className="active">{studentGroup.name}</Link>
        </li>
      </ol>
      <AddStudentsForm
        studentGroupNodeId={params.studentGroupNodeId}
        studentGroupId={studentGroup.id}
        institutionId={institution.id}
        depth={depth}
      />
    </div>
  );
};

AddStudentsView.propTypes = {
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  studentGroup: PropTypes.object,
  params: PropTypes.object,
  isLoading: PropTypes.bool,
  depth: PropTypes.number,
};

export { AddStudentsView };
