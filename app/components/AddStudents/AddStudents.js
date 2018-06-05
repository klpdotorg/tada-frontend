import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { AddStudentsForm } from '../../containers/AddStudents';
import { Loading } from '../common';

const AddStudentsView = (props) => {
  const {
    district,
    block,
    cluster,
    institution,
    studentGroup,
    isLoading,
    params,
    depth,
    hasPermissions,
    paths,
  } = props;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={paths[0]}>{district.name}</Link>
        </li>
        <li>
          <Link to={paths[1]}>{block.name}</Link>
        </li>
        <li>
          <Link to={paths[2]}>{cluster.name}</Link>
        </li>
        <li>
          <Link to={paths[3]}>{institution.name}</Link>
        </li>
        <li>
          <Link to={paths[4]}>{studentGroup.name}</Link>
        </li>
        <li className="active"> Add Students</li>
      </ol>
      <AddStudentsForm
        studentGroupNodeId={params.studentGroupNodeId}
        studentGroupId={studentGroup.id}
        institutionId={institution.id}
        depth={depth}
        hasPermissions={hasPermissions}
      />
    </div>
  );
};

AddStudentsView.propTypes = {
  paths: PropTypes.array,
  hasPermissions: PropTypes.bool,
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
